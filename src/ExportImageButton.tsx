import { useState } from "react";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { Icon } from "./Icon";

export const ExportImageButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const copyToClipboardOrDownload = async (dataUrl: string) => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Check if Clipboard API is available
      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error("Clipboard API not supported");
      }

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    } catch (clipboardError) {
      console.error("Failed to copy to clipboard:", clipboardError);
      // Fallback: download the image
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `handout-${Date.now()}.png`;
      a.click();
      
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2000);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      // Find the render area content
      const renderAreaContent = document.querySelector(".render-area-content");
      if (!renderAreaContent) {
        throw new Error("Render area not found");
      }

      // Get children of render-area-content
      const children = renderAreaContent.children;
      let elementToCapture: HTMLElement;
      let tempWrapper: HTMLElement | null = null;

      if (children.length === 0) {
        throw new Error("No content to export");
      } else if (children.length === 1) {
        // Export the first (and only) child
        elementToCapture = children[0] as HTMLElement;
      } else {
        // Create a temporary wrapper div for multiple children
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        
        // Clone all children into the wrapper
        Array.from(children).forEach(child => {
          wrapper.appendChild(child.cloneNode(true));
        });
        
        // Temporarily add wrapper to document for rendering
        document.body.appendChild(wrapper);
        elementToCapture = wrapper;
        tempWrapper = wrapper;
      }

      let dataUrl: string;
      
      try {
        // Try html-to-image first (better CSS support)
        console.log("Trying html-to-image...");
        dataUrl = await toPng(elementToCapture, {
          backgroundColor: null, // Transparent background
          pixelRatio: 1, // Normal resolution - half the previous size
          skipAutoScale: true,
          canvasWidth: elementToCapture.offsetWidth,
          canvasHeight: elementToCapture.offsetHeight,
          skipFonts: true, // Skip web fonts to avoid CORS issues
          preferredFontFormat: 'woff2',
          filter: (node) => {
            // Skip external stylesheets and problematic nodes
            if (node instanceof HTMLLinkElement && node.rel === 'stylesheet') {
              return false;
            }
            if (node instanceof HTMLStyleElement && node.sheet) {
              try {
                // Test if we can access the sheet rules
                node.sheet.cssRules;
                return true;
              } catch (e) {
                // Skip stylesheets we can't access due to CORS
                return false;
              }
            }
            return true;
          }
        });
        console.log("html-to-image succeeded");
      } catch (htmlToImageError) {
        console.warn("html-to-image failed, falling back to html2canvas:", htmlToImageError);
        
        // Fallback to html2canvas
        const canvas = await html2canvas(elementToCapture, {
          backgroundColor: null, // Transparent background
          scale: 1, // Normal resolution - half the previous size
          logging: false,
          useCORS: true, // Allow cross-origin images
          allowTaint: true,
        });
        
        dataUrl = canvas.toDataURL("image/png");
        console.log("html2canvas fallback succeeded");
      }

      // Clean up temporary wrapper if created
      if (tempWrapper && tempWrapper.parentNode === document.body) {
        document.body.removeChild(tempWrapper);
      }

      // Copy to clipboard or download
      await copyToClipboardOrDownload(dataUrl);

    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed md:absolute bottom-4 right-4 z-50">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="bg-blue-500 rounded-full hover:-translate-y-1 active:scale-90 transition-transform p-2 disabled:opacity-50 disabled:cursor-not-allowed relative"
        title="Export handout as image"
      >
        {isExporting ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : exportSuccess ? (
          <Icon name="check" colour="white" size="md" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        )}
      </button>
      
      {exportSuccess && (
        <div className="absolute bottom-full right-0 mb-2 bg-green-500 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
          Image copied to clipboard!
        </div>
      )}
    </div>
  );
};
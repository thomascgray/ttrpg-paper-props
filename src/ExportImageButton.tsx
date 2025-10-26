import { useState } from "react";
import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { Icon } from "./Icon";
import { Menu, Radio, Checkbox } from "@mantine/core";
import { useSnapshot } from "valtio";
import { appState as appStateProxy } from "./appState";

export const ExportImageButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const appState = useSnapshot(appStateProxy);

  const copyToClipboardOrDownload = async (dataUrl: string) => {
    try {
      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (appState.exportMode === "clipboard") {
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
      } else {
        // Download the image
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `handout-${Date.now()}.png`;
        a.click();

        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Failed to export:", error);
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
      // Ensure all fonts are loaded before starting
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
        Array.from(children).forEach((child) => {
          wrapper.appendChild(child.cloneNode(true));
        });

        // Temporarily add wrapper to document for rendering
        document.body.appendChild(wrapper);
        elementToCapture = wrapper;
        tempWrapper = wrapper;

        // Wait for fonts to load in the cloned elements
      }

      // Handle padding setting
      if (!appState.exportIncludePadding) {
        // If we don't want padding, look for the #area-to-export element
        const areaToExport = elementToCapture.querySelector("#area-to-export");
        if (areaToExport) {
          elementToCapture = areaToExport as HTMLElement;
        }
      }

      // Ensure fonts are ready for the element to capture

      let dataUrl: string;

      try {
        // Try html-to-image first (better CSS support)
        console.log("Trying html-to-image...");

        // Wait one more time to ensure fonts are absolutely ready

        dataUrl = await toPng(elementToCapture, {
          backgroundColor: undefined, // Transparent background
          pixelRatio: 1, // Normal resolution - half the previous size
          canvasWidth: elementToCapture.offsetWidth,
          canvasHeight: elementToCapture.offsetHeight,
        });
        console.log("html-to-image succeeded");
      } catch (htmlToImageError) {
        console.warn(
          "html-to-image failed, falling back to html2canvas:",
          htmlToImageError
        );

        // Wait for fonts again before fallback

        // Fallback to html2canvas
        const canvas = await html2canvas(elementToCapture, {
          backgroundColor: null, // Transparent background
          scale: 1, // Normal resolution - half the previous size
          logging: false,
          useCORS: true, // Allow cross-origin images
          allowTaint: true,

          // Font handling options for html2canvas
          onclone: async (clonedDoc) => {
            // Ensure fonts are available in the cloned document
            try {
              if (clonedDoc.fonts && clonedDoc.fonts.ready) {
                await Promise.race([
                  clonedDoc.fonts.ready,
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                ]);
              }
            } catch (fontError) {
              console.warn(
                "Font loading in cloned document failed:",
                fontError
              );
            }
          },
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
    <div className="fixed flex items-center gap-1 md:absolute bottom-9 right-5 z-50">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="bg-blue-500 hover:bg-blue-600 rounded-lg rounded-tr-none rounded-br-none active:scale-95 transition-transform px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed relative flex items-center gap-2"
        title="Export handout as image"
      >
        {isExporting ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : exportSuccess ? (
          <Icon name="check" colour="white" size="md" />
        ) : (
          <Icon name="download" colour="white" size="md" />
        )}
        <span className="text-white font-bold text-sm">Export Handout</span>
      </button>

      {exportSuccess && (
        <div className="absolute bottom-full right-0 mb-2 bg-green-500 text-white px-3 py-2 rounded-md text-sm whitespace-nowrap">
          {appState.exportMode === "clipboard"
            ? "Image copied to clipboard!"
            : "Image downloaded!"}
        </div>
      )}

      <Menu position="top-end" offset={8}>
        <Menu.Target>
          <button className="bg-blue-500 hover:bg-blue-600 rounded-lg rounded-tl-none rounded-bl-none active:scale-95 transition-transform px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed relative flex items-center">
            <Icon name="settings" colour="white" size="md" />
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Export Settings</Menu.Label>

          <div className="px-3 py-2">
            <Radio.Group
              value={appState.exportMode}
              onChange={(value) => {
                appStateProxy.exportMode = value as "clipboard" | "download";
              }}
            >
              <div className="space-y-2">
                <Radio value="clipboard" label="Copy to clipboard" />
                <Radio value="download" label="Download as file" />
              </div>
            </Radio.Group>
          </div>

          {/* <Menu.Divider /> */}

          {/* <div className="px-3 py-2">
            <Checkbox
              checked={appState.exportIncludePadding}
              onChange={(e) => {
                appStateProxy.exportIncludePadding = e.currentTarget.checked;
              }}
              label="Include padding around handout"
            />
          </div> */}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

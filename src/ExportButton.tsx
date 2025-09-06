import { useState } from "react";
import domtoimage from "dom-to-image-more";
import { Icon } from "./Icon";
import classNames from "classnames";

export const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Find the render area content
      const element = document.querySelector('.render-area-content') as HTMLElement;
      
      if (!element) {
        console.error('Could not find .render-area-content element');
        setIsExporting(false);
        return;
      }

      // Create blob from the element using dom-to-image-more
      const blob = await domtoimage.toBlob(element, {
        quality: 1.0,
        bgcolor: null, // Preserve transparency
        scale: 2, // Higher quality
        style: {
          // Remove any borders that might appear
          border: 'none',
          outline: 'none'
        },
        adjustClone: (node, clonedNode, after) => {
          // Remove border and outline styles from all cloned elements
          if (clonedNode instanceof HTMLElement) {
            clonedNode.style.border = 'none';
            clonedNode.style.outline = 'none';
            clonedNode.style.boxShadow = 'none';
            
            // Also remove any border-related classes if they exist
            const borderClasses = Array.from(clonedNode.classList).filter(
              cls => cls.includes('border') || cls.includes('outline')
            );
            borderClasses.forEach(cls => clonedNode.classList.remove(cls));
          }
        }
      });

      if (!blob) {
        console.error('Failed to create blob from element');
        setIsExporting(false);
        return;
      }

      try {
        // Check if Clipboard API is available
        if (navigator.clipboard && 'write' in navigator.clipboard) {
          // Use the modern Clipboard API
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob
            })
          ]);
          
          // Show success feedback
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        } else {
          // Fallback for browsers that don't support clipboard write
          console.error('Clipboard API not supported. Downloading image instead.');
          
          // Create download link as fallback
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `handout-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      } catch (err) {
        console.error('Failed to copy image to clipboard:', err);
      }
      
      setIsExporting(false);
    } catch (err) {
      console.error('Failed to capture element:', err);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed md:absolute bottom-4 right-4 z-50">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={classNames(
          "bg-blue-500 rounded-full hover:-translate-y-1 active:scale-90 transition-all p-2",
          {
            "opacity-50 cursor-not-allowed": isExporting,
            "bg-green-500": showSuccess,
          }
        )}
        title="Export to clipboard"
      >
        {showSuccess ? (
          <Icon name="check" colour="white" size="md" />
        ) : (
          <Icon name="photo" colour="white" size="md" />
        )}
      </button>
      
      {isExporting && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          Exporting...
        </div>
      )}
      
      {showSuccess && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};
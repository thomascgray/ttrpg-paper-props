/**
 * Utility functions for converting external image URLs to base64 data URLs
 * to avoid CORS issues during export operations
 */

export interface ImageConversionResult {
  success: boolean;
  dataUrl?: string;
  error?: string;
}

/**
 * Converts an external image URL to a base64 data URL
 * @param imageUrl - The external image URL to convert
 * @param fallbackColor - Fallback color for failed conversions (default: transparent)
 * @returns Promise resolving to conversion result
 */
export async function convertImageToBase64(
  imageUrl: string,
  fallbackColor: string = "transparent"
): Promise<ImageConversionResult> {
  try {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    // Create an image element
    const img = new Image();
    img.crossOrigin = "anonymous"; // Try to enable CORS

    // Wait for image to load
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
      
      // Set a timeout to avoid hanging
      const timeout = setTimeout(() => {
        reject(new Error("Image load timeout"));
      }, 10000);
      
      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Failed to load image"));
      };
      
      img.src = imageUrl;
    });

    // Set canvas dimensions to match image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0);

    // Convert to data URL
    const dataUrl = canvas.toDataURL("image/png");
    
    // Clean up
    canvas.remove();
    
    return {
      success: true,
      dataUrl
    };

  } catch (error) {
    console.warn(`Failed to convert image ${imageUrl}:`, error);
    
    // Create a fallback 1x1 transparent image
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    
    if (ctx && fallbackColor !== "transparent") {
      ctx.fillStyle = fallbackColor;
      ctx.fillRect(0, 0, 1, 1);
    }
    
    const fallbackDataUrl = canvas.toDataURL("image/png");
    canvas.remove();
    
    return {
      success: false,
      dataUrl: fallbackDataUrl,
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

/**
 * Batch convert multiple image URLs to base64
 * @param imageUrls - Array of image URLs to convert
 * @param onProgress - Optional progress callback
 * @returns Promise resolving to array of conversion results
 */
export async function convertImagestoBase64Batch(
  imageUrls: string[],
  onProgress?: (completed: number, total: number) => void
): Promise<ImageConversionResult[]> {
  const results: ImageConversionResult[] = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    const result = await convertImageToBase64(imageUrls[i]);
    results.push(result);
    
    if (onProgress) {
      onProgress(i + 1, imageUrls.length);
    }
  }
  
  return results;
}

/**
 * Check if a URL is an external image URL (http/https)
 * @param url - URL to check
 * @returns True if external image URL
 */
export function isExternalImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}
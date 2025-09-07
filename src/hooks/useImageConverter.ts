import { useEffect, useState } from "react";
import { convertImageToBase64, isExternalImageUrl } from "../utils/imageConverter";
import { allConfigs } from "../handoutConfigs";
import { db } from "../database";

interface ImageConversionState {
  isConverting: boolean;
  completed: number;
  total: number;
  errors: string[];
}

/**
 * Hook to convert external default images to base64 on app initialization
 * This prevents CORS issues during export operations
 */
export function useImageConverter() {
  const [conversionState, setConversionState] = useState<ImageConversionState>({
    isConverting: false,
    completed: 0,
    total: 0,
    errors: []
  });

  /**
   * Extract external image URLs from handout configs
   */
  const extractExternalImageUrls = () => {
    const externalUrls: Array<{
      handoutType: string;
      field: string;
      url: string;
    }> = [];

    allConfigs.forEach((handoutConfig: any) => {
      const configEntries = Object.entries(handoutConfig.config);
      
      configEntries.forEach(([key, value]) => {
        // Handle nested configs (like paper.image, etc.)
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (Array.isArray(nestedValue) && typeof nestedValue[0] === 'string' && isExternalImageUrl(nestedValue[0])) {
              externalUrls.push({
                handoutType: handoutConfig.name,
                field: `${key}.${nestedKey}`,
                url: nestedValue[0]
              });
            }
          });
        }
        // Handle direct config values
        else if (Array.isArray(value) && typeof value[0] === 'string' && isExternalImageUrl(value[0])) {
          externalUrls.push({
            handoutType: handoutConfig.name,
            field: key,
            url: value[0]
          });
        }
      });
    });

    return externalUrls;
  };

  /**
   * Convert external images and update database records
   */
  const convertExternalImages = async () => {
    const externalUrls = extractExternalImageUrls();
    
    if (externalUrls.length === 0) {
      console.log("No external images found to convert");
      return;
    }

    console.log(`Converting ${externalUrls.length} external images to base64...`);
    
    setConversionState({
      isConverting: true,
      completed: 0,
      total: externalUrls.length,
      errors: []
    });

    const errors: string[] = [];

    for (let i = 0; i < externalUrls.length; i++) {
      const { handoutType, field, url } = externalUrls[i];
      
      try {
        const result = await convertImageToBase64(url);
        
        if (result.success && result.dataUrl) {
          // Update the transient database record for this handout type
          const transientId = `TRANSIENT_${handoutType}`;
          const existingRecord = await db.handouts
            .where('id')
            .equals(transientId)
            .first();

          if (existingRecord) {
            // Update existing record
            const updatedData = { ...existingRecord.data };
            
            // Handle nested field updates (e.g., "paper.image")
            if (field.includes('.')) {
              const [parentKey, childKey] = field.split('.');
              if (!updatedData[parentKey]) {
                updatedData[parentKey] = {};
              }
              updatedData[parentKey][childKey] = result.dataUrl;
            } else {
              updatedData[field] = result.dataUrl;
            }
            
            await db.handouts.update(transientId, {
              data: updatedData
            });
          } else {
            // Create new transient record with converted image
            const newData: any = {};
            
            if (field.includes('.')) {
              const [parentKey, childKey] = field.split('.');
              newData[parentKey] = { [childKey]: result.dataUrl };
            } else {
              newData[field] = result.dataUrl;
            }
            
            await db.handouts.add({
              id: transientId,
              type: handoutType,
              data: newData
            });
          }
          
          console.log(`✓ Converted ${handoutType}.${field}`);
        } else {
          const error = `Failed to convert ${handoutType}.${field}: ${result.error}`;
          console.warn(error);
          errors.push(error);
        }
      } catch (error) {
        const errorMsg = `Error converting ${handoutType}.${field}: ${error}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
      
      // Update progress
      setConversionState(prev => ({
        ...prev,
        completed: i + 1,
        errors: [...errors]
      }));
    }

    // Conversion complete
    setConversionState(prev => ({
      ...prev,
      isConverting: false
    }));

    if (errors.length === 0) {
      console.log("✓ All external images converted successfully");
    } else {
      console.warn(`⚠ Image conversion completed with ${errors.length} errors:`, errors);
    }
  };

  /**
   * Initialize image conversion on mount
   */
  useEffect(() => {
    // Run conversion on app startup
    convertExternalImages();
  }, []);

  return {
    ...conversionState,
    retryConversion: convertExternalImages
  };
}
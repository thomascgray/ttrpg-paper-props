# Image Storage Migration: From Base64 to Binary in Dexie

## Current State Analysis

### How Images Currently Work
- Images are uploaded via the `ImageInput` component (`src/components/ImageInput.tsx`)
- When a user uploads a file:
  1. File is converted to WebP format using `blobToWebP()` 
  2. WebP blob is converted to base64 using `FileReader.readAsDataURL()`
  3. Base64 string is stored directly in the main JSON blob in Dexie's `handouts` table
- For URL images: same process (fetch → WebP → base64 → store in JSON)
- Images are rendered by passing the base64 string directly to `<img src={base64String}>` (see `src/renderer/CharacterCard.tsx:25`)

### Current Data Structure
```javascript
// handouts table structure
{
  id: string,           // e.g. "TRANSIENT_Newspaper"
  type: string,         // e.g. "Newspaper"
  data: {               // Large JSON blob containing all form data
    test_image_input: "data:image/webp;base64,UklGRmw...", // base64 string
    // ... other form fields
  }
}
```

### Problems with Current Approach
- **Storage inefficiency**: Base64 encoding adds ~33% overhead
- **Large JSON blobs**: Images make the entire data object massive
- **Memory usage**: All image data loaded into memory with form data
- **Performance**: Large base64 strings slow down database operations

## Migration Plan

### 1. Create New Database Schema
- [ ] Add new `images` table to store binary image data
- [ ] Update database version to trigger migration
- [ ] Define image record structure:
  ```javascript
  {
    id: string,           // unique identifier (UUID)
    data: Blob,          // binary image data (WebP format)
    mimeType: string,    // "image/webp"
    originalName?: string, // optional original filename
    createdAt: Date,     // for cleanup/garbage collection
    size: number         // blob size in bytes
  }
  ```

### 2. Modify ImageInput Component
- [ ] Update `src/components/ImageInput.tsx`:
  - [ ] Change `convertFileToBase64` to `convertFileToBlob` 
  - [ ] Return WebP blob instead of base64 string
  - [ ] Generate unique image IDs using `crypto.randomUUID()`
  - [ ] Store blob in new `images` table
  - [ ] Return image ID to form instead of base64 string
  - [ ] Update URL handling to also store as blob with generated ID
- [ ] Update component interface to handle image IDs vs base64 strings

### 3. Create Image Management System
- [ ] Create `src/utils/imageManager.ts` with functions:
  - [ ] `storeImage(blob: Blob, originalName?: string): Promise<string>` - store image and return ID
  - [ ] `getImageBlob(id: string): Promise<Blob | null>` - retrieve image blob by ID
  - [ ] `getImageURL(id: string): Promise<string>` - get blob URL for rendering
  - [ ] `deleteImage(id: string): Promise<void>` - remove image from database
  - [ ] `cleanupUnusedImages(): Promise<void>` - garbage collection
- [ ] Add blob URL management:
  - [ ] Create blob URLs using `URL.createObjectURL()` for rendering
  - [ ] Add cleanup mechanism to revoke blob URLs when no longer needed
  - [ ] Consider caching blob URLs to avoid recreating them

### 4. Update Database Schema and Migration
- [ ] Update `src/db.ts`:
  - [ ] Add `images` table definition
  - [ ] Bump database version (currently version 1)
  - [ ] Add migration logic to convert existing base64 images to blobs
  - [ ] Update handout data to use image IDs instead of base64 strings
- [ ] Migration steps:
  1. Parse existing handout data
  2. Extract base64 images from JSON blobs
  3. Convert base64 back to blobs
  4. Store blobs in new `images` table
  5. Replace base64 strings with image IDs in handout data
  6. Update handout records with new data structure

### 5. Modify Rendering Components
- [ ] Update `src/renderer/CharacterCard.tsx`:
  - [ ] Change from accepting base64 string to accepting image ID
  - [ ] Fetch blob from database using image ID
  - [ ] Create blob URL for img src
  - [ ] Handle loading states while fetching image
  - [ ] Add error handling for missing images
  - [ ] Cleanup blob URLs when component unmounts
- [ ] Apply similar changes to other renderers that use images
- [ ] Consider creating a reusable `ImageRenderer` component

### 6. Update Form Handling
- [ ] Update `src/App.tsx` and `src/FormRenderer.tsx`:
  - [ ] Handle image ID values instead of base64 strings
  - [ ] Ensure form data serialization works with image IDs
  - [ ] Update onChange handlers to properly store image IDs
- [ ] Update any validation logic that might check image formats

### 7. Add Image Cleanup and Optimization
- [ ] Implement image cleanup when handouts are deleted
- [ ] Add orphaned image cleanup (images not referenced by any handout)
- [ ] Consider image deduplication:
  - [ ] Hash image content to detect duplicates
  - [ ] Store reference count for shared images
  - [ ] Only delete images when reference count reaches zero
- [ ] Add image optimization settings:
  - [ ] Configurable WebP quality settings
  - [ ] Maximum image size limits
  - [ ] Automatic image resizing for very large images

### 8. Error Handling and User Experience
- [ ] Add proper error handling for image operations
- [ ] Show loading states during image processing
- [ ] Handle cases where images fail to load or are missing
- [ ] Add fallback images or placeholders for missing images
- [ ] Provide user feedback for image operations (upload, delete, etc.)

### 9. Testing and Validation
- [ ] Test migration with existing data
- [ ] Verify all image operations work correctly
- [ ] Test error scenarios (missing images, corrupted data, etc.)
- [ ] Performance testing with large numbers of images
- [ ] Test cleanup and garbage collection functions

### 10. Documentation and Cleanup
- [ ] Update component documentation
- [ ] Add JSDoc comments to new image management functions
- [ ] Remove old base64-related code
- [ ] Update any examples or documentation that reference the old system

## Implementation Notes

### Database Schema Update
```javascript
// New version 2 schema
db.version(2).stores({
  handouts: "++id, type, data",
  images: "++id, data, mimeType, originalName, createdAt, size"
}).upgrade(tx => {
  // Migration logic here
});
```

### Image ID Generation
```javascript
// Generate unique image IDs
const imageId = crypto.randomUUID();
```

### Blob URL Management
```javascript
// Create blob URL for rendering
const blobUrl = URL.createObjectURL(blob);

// Don't forget to cleanup
useEffect(() => {
  return () => {
    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }
  };
}, [blobUrl]);
```

## Benefits of This Migration

1. **Reduced Storage Size**: Eliminate base64 encoding overhead (~33% reduction)
2. **Better Performance**: Smaller JSON blobs, faster database operations
3. **Improved Memory Usage**: Images loaded on-demand rather than with form data
4. **Proper Binary Handling**: Native blob support in Dexie
5. **Future-Proof**: Easier to add features like thumbnails, image optimization, etc.
6. **Better User Experience**: Faster loading, better error handling

## Potential Challenges

1. **Data Migration**: Need to handle existing base64 data carefully
2. **Blob URL Lifecycle**: Proper cleanup to avoid memory leaks
3. **Async Image Loading**: Components need to handle loading states
4. **Error Handling**: Missing or corrupted images need graceful handling
5. **Testing**: More complex data flow requires thorough testing

## Progress Tracking

- [ ] **Step 1**: Database schema update
- [ ] **Step 2**: Image management utilities
- [ ] **Step 3**: ImageInput component updates
- [ ] **Step 4**: Rendering component updates
- [ ] **Step 5**: Form handling updates
- [ ] **Step 6**: Data migration implementation
- [ ] **Step 7**: Error handling and UX improvements
- [ ] **Step 8**: Testing and validation
- [ ] **Step 9**: Cleanup and documentation
- [ ] **Step 10**: Final testing and deployment
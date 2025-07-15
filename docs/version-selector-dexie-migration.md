# Version Selector Dexie Migration Plan

## Overview
This document outlines the plan to migrate the VersionSelector component from using localStorage to Dexie database for version management.

## Current State Analysis

### Existing Components
- **VersionSelector.tsx**: UI component that displays save button and version dropdown
- **useVersionManager.ts**: Hook that manages version state and operations using localStorage
- **useLocalStorage.ts**: Low-level hook for localStorage operations

### Current Data Flow
1. User clicks "Save Snapshot" → saves to localStorage with timestamp
2. Version list stored as array in localStorage
3. Selected version loads data from localStorage by timestamp key

### Issues with Current Implementation
- Not integrated with new Dexie architecture
- Uses localStorage which has size limitations
- No version naming capability
- No delete functionality

## New Architecture with Dexie

### Database Schema Changes
Add new `versions` table to existing Dexie database:
```typescript
{
  id: string,          // Auto-generated ID
  handoutType: string, // Type of handout (Newspaper, etc.)
  name: string,        // User-defined version name
  data: any,          // Complete handout data
  timestamp: number,   // Created timestamp
  createdAt: Date     // Creation date
}
```

### Updated Data Flow
1. **Save Version**: Insert new row in `versions` table
2. **Load Version**: Query by ID and update transient record
3. **List Versions**: Query all versions for current handout type
4. **Delete Version**: Remove row from table

## Implementation Steps

### 1. Update Database Schema
- Modify `db.ts` to add versions table
- Update Dexie version number
- Add TypeScript types for version records

### 2. Create New useVersionManager Hook
Replace localStorage operations with Dexie:
- `saveVersion(name?: string)`: Create new version record
- `loadVersion(id: string)`: Load version into transient record
- `deleteVersion(id: string)`: Remove version
- `renameVersion(id: string, name: string)`: Update version name
- `useVersionsList()`: React hook for live version list

### 3. Update VersionSelector Component
Enhance UI to support new features:
- Text input for version name when saving
- Display version names in dropdown
- Add delete button for each version
- Show creation date/time
- Confirm dialog for delete operations

### 4. Integration in App.tsx
- Import and render VersionSelector below HandoutTypeSelector
- Pass current handout type and data
- Handle version selection and updates

### 5. Data Migration
Create migration utility for existing localStorage data:
- Check for existing localStorage versions on startup
- Convert to new Dexie format
- Preserve timestamps and data
- Clean up localStorage after successful migration

### 6. Testing Considerations
- Test version save/load/delete operations
- Verify data integrity across version switches
- Test migration from localStorage
- Handle edge cases (corrupt data, missing fields)

## UI/UX Improvements

### Save Dialog
- Modal/inline form for version name
- Default name: "Version saved at [time]"
- Optional description field

### Version List Display
- Show version name (bold)
- Show creation date/time (smaller text)
- Delete button (trash icon)
- Edit name button (pencil icon)

### Confirmation Dialogs
- Confirm before deleting version
- Warn if unsaved changes when switching versions

## Benefits of Migration

1. **Scalability**: IndexedDB has much higher storage limits than localStorage
2. **Performance**: Better query performance for large datasets
3. **Features**: Easier to add search, filtering, sorting
4. **Consistency**: Aligns with rest of app's data architecture
5. **Extensibility**: Can add metadata, tags, sharing in future

## Future Enhancements

- Version comparison/diff view
- Export/import versions
- Version tagging/categorization
- Auto-save functionality
- Version branching/forking
- Collaborative features
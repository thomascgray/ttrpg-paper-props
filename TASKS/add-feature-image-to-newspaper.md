# add-feature-image-to-newspaper
**Status**: In Progress

## Overview
Add a "feature image" to the newspaper handout that can be positioned left or right aligned alongside the main copy content. The feature image should be a standard image selection input with alignment controls and should occupy its own column with the same dimensions as the main copy columns.

## Task Context
- **Handout Config**: Refer to ./CLAUDE/handout-configs.md for guidance on modifying handout configurations
- **Renderer Component**: Refer to ./CLAUDE/rendering-components.md for guidance on modifying renderer components in src/renderer/
- **Key files**: 
  - `src/handoutConfigs.ts` - Contains the newspaper handout config that needs updating
  - `src/renderer/Newspaper.tsx` - Renderer component that needs layout modifications
  - `src/inputHelpers.ts` - Contains `imageInput()` and `select()` helper functions
- **Pattern**: Use tuple pattern `[defaultValue, inputHelper()]` for config entries
- **Input helpers needed**:
  - `imageInput()` for the feature image selection
  - `select()` for left/right alignment choice

## Blockers/Issues
None currently

## TODO
[X] Add feature image section to newspaper handout config in handoutConfigs.ts
    [X] Add feature image URL/upload input using imageInput()
    [X] Add alignment selection (left/right) using select()
[X] Update Newspaper renderer component to handle feature image
    [X] Implement left alignment layout (image left, copy right)
    [X] Implement right alignment layout (image right, copy left)
    [X] Ensure feature image column matches main copy column dimensions
[X] Test the feature in the application
    [X] Verify TypeScript compilation passes with no type errors

## Work Log
[2025-09-07] Added feature image functionality to newspaper handout
- Files modified: src/handoutConfigs.ts, src/renderer/Newspaper.tsx
- Added featureImage section to NewspaperConfig with imageInput() and select() helpers
- Updated Newspaper renderer to support two-column layout with feature image
- Implemented left/right alignment with flex-row-reverse for right alignment
- Feature image and main copy columns use equal flex-1 widths
- Maintains backward compatibility - shows original layout when no feature image

[2025-09-07] Added blur and image filter effects to feature image
- Files modified: src/handoutConfigs.ts, src/renderer/Newspaper.tsx
- Added isFeatureImageBlurry boolean to control blur effect
- Added featureImageFilter with imageFilter() helper for sepia, contrast, etc.
- Applied classNames with blur and filter effects to both left and right aligned images
- Effects work identically to character card implementation
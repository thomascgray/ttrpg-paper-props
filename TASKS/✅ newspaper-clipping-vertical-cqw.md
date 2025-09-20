# Update Newspaper Clipping (Vertical) to use CQW Units
**Status**: Complete

## Overview
Update the NewspaperClipping (vertical) handout configuration to use configurable `cqw` units for responsive sizing, following the same pattern as the newspaper handout update. The newspaper clipping renderer currently uses fixed pixel values and lacks font size controls. We need to make dimensions and font sizes configurable through the form using cqw units while maintaining responsive scaling behavior.

## Task Context
- Reference task: `TASKS/✅ update-newspaper-form-inputs.md` - use this as the template for implementation
- All renderers must fully adapt to browser width using `cqw` units for responsive scaling
- Current hardcoded values in NewspaperClipping.tsx:
  - Page dimensions: Fixed pixels in width/height (lines 23-24)
  - No font size controls currently exist for the text content
- The handout config system uses tuples: `[defaultValue, inputHelper()]`
- Input helpers are defined in `src/inputHelpers.ts`
- The `range()` helper supports custom suffix parameter for units
- The NewspaperClipping has three text sections: prefix_copy, mainCopy, suffix_copy
- See `CLAUDE/rendering-components.md` for positioning system details
- See `CLAUDE/handout-configs.md` for handout config patterns

## Blockers/Issues
None currently

## TODO
[ ] Update NewspaperClippingConfig in handoutConfigs.ts to use cqw units
    [ ] Replace pageWidth with cqw-based range input (default based on aspect ratio)
    [ ] Replace pageHeight with cqw-based range input (default based on aspect ratio)
    [ ] Add fontSize fields for each text section:
        [ ] Add prefixFontSize with cqw-based range input
        [ ] Add mainCopyFontSize with cqw-based range input  
        [ ] Add suffixFontSize with cqw-based range input
[ ] Update NewspaperClipping.tsx renderer to use form values instead of hardcoded values
    [ ] Use cqw units for width and height from form values
    [ ] Apply fontSize styles to each text section using form values
    [ ] Ensure container query context is set up properly
[ ] Set appropriate min/max ranges for each cqw input
    [ ] Page dimensions: appropriate ranges for vertical clipping aspect ratio
    [ ] Font sizes: appropriate ranges for readability
[ ] Test that all sizing scales responsively with browser width
[ ] Verify form inputs update the preview correctly

## Work Log
[2025-09-20] Updated NewspaperClipping handout to use configurable cqw units for responsive sizing
- Files modified: src/handoutConfigs.ts, src/renderer/NewspaperClipping.tsx
- Replaced pixel-based dimensions with cqw units (pageWidth: 30cqw, pageHeight: 50cqw)
- Restructured config to use nested objects for text sections (prefixCopy, mainCopy, suffixCopy)
- Added fontSize controls for each text section using cqw units (1.2-1.5cqw defaults)
- Updated renderer to use container query context and form-controlled font sizes
- Maintained responsive margins and padding using cqw units
- Fixed TypeScript issues by wrapping Markdown components in divs with style props

[2025-09-20] Fixed responsive scaling issue - content appearing/disappearing with browser width changes
- **Root cause**: Using both width AND height in cqw units created dynamic aspect ratio that broke layout
- **Solution**: Follow newspaper component pattern with only width in cqw + CSS aspect ratio
- Removed pageHeight from config, keeping only pageWidth in cqw units
- Added aspect-[4/7] class to maintain 400:700px original proportions
- Changed margins/padding from cqw to fixed units (rem) to prevent scaling issues
- Added proper container query setup with nested div like newspaper component
- Changed overflow-hidden to overflow-clip for consistent behavior
- Added max-w-[80em] to prevent excessive scaling
- Now scales proportionally while maintaining exact same layout and content visibility

[2025-09-20] BREAKTHROUGH: Discovered key insights for proper CQW implementation
- **Critical discovery**: The `prose` class conflicts with cqw units and must be removed from Markdown
- **Container setup**: containerType: "inline-size" should NOT be on main parent, but on wrapper one layer underneath
- **All spacing must use cqw**: margins, padding, font sizes - everything needs cqw for consistent scaling
- **Both width AND height CAN work**: When done properly with nested containers and no prose class
- **Config values as proportions**: Width/height values in config represent proportions, not literal cqw (hence no suffix)
- **Nested container contexts**: Multiple containerType layers allow for proper font size scaling
- Updated implementation now working perfectly with consistent responsive scaling
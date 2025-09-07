# fonts-in-export
**Status**: Complete

## Overview
Fix the font rendering issue in exported handout images. Currently, the export-to-image feature works and fonts load correctly in the actual app render, but when exporting handouts to images via the ExportImageButton, the fonts fall back to system fonts instead of using the locally hosted fonts. We need to investigate why html-to-image and html2canvas are not properly capturing the local fonts and implement a solution.

## Task Context
- Export functionality exists in `src/ExportImageButton.tsx` using html-to-image and html2canvas libraries
- Local fonts are properly set up in `public/fonts/` with 72+ TTF files and CSS declarations in `public/fonts/fonts.css`  
- All Google Fonts were converted to local hosting and work correctly in the app interface
- Export button captures the first child of `.render-area-content` element
- The issue is specifically with font rendering during DOM-to-canvas conversion, not with the export mechanism itself
- Related work: `./TASKS/export-to-image.md` (export feature implementation) and `./TASKS/local-fonts.md` (local font setup)
- Framework: React 19 with TypeScript, Valtio state management, Tailwind CSS styling
- Renderer components in `src/renderer/` depend on these fonts for proper display

## Blockers/Issues
None currently

## TODO
[ ] Investigate why fonts don't render in exported images
    [ ] Test font loading timing - ensure fonts are fully loaded before capture
    [ ] Check if html-to-image and html2canvas properly handle @font-face declarations
    [ ] Verify font file paths are accessible during image conversion
[ ] Implement font loading solution for export
    [ ] Research best practices for font handling in DOM-to-canvas libraries
    [ ] Consider pre-loading fonts or waiting for font loading before capture
    [ ] Test with different export libraries if current ones have font limitations
[ ] Test font rendering across different handout types
    [ ] Verify all renderer components export with correct fonts
    [ ] Test various font families used in the app (all 24+ font families)
    [ ] Ensure both variable and static fonts work properly in exports

## Work Log
[2025-09-07] Fixed font rendering in exported images
- Files modified: src/ExportImageButton.tsx
- Removed `skipFonts: true` option from html-to-image that was preventing local fonts from being used
- Changed `preferredFontFormat` from 'woff2' to 'truetype' to match our TTF font files
- Fixed TypeScript error by changing backgroundColor from null to undefined
- Ready for testing with different handout types
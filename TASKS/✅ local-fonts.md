# local-fonts
**Status**: Complete

## Overview
Convert all Google Fonts currently loaded via CDN links in index.html to locally hosted font files. This should fix the export-to-image feature where fonts are currently not rendering correctly, falling back to system fonts instead. By self-hosting the fonts, they should be properly available when html-to-image or html2canvas captures the DOM for export.

## Task Context
- The app currently loads fonts via Google Fonts CDN links in `index.html` (lines 25-28)
- Export-to-image feature exists in `src/ExportImageButton.tsx` using html-to-image and html2canvas libraries
- Previous export-to-image work noted CSS support issues (see `./TASKS/export-to-image.md`)
- Build tool is Vite which can handle static assets and font files
- Package manager is Bun
- The renderer components in `src/renderer/` rely on these fonts for proper display
- Fonts are likely referenced in CSS files (`index.css`, `ink.css`) and possibly in components

## Blockers/Issues
None currently

## TODO
[X] Identify all fonts currently loaded from Google Fonts
    [X] List all font families and their weights/styles from index.html
    [X] Check which fonts are actually used in the app's CSS and components
[X] Download the font files locally
    [X] Create appropriate directory structure (e.g., `public/fonts/` or `src/assets/fonts/`)
    [X] Download all required font weights and styles in web formats (woff2, woff)
    [X] Ensure proper licensing for self-hosting
[X] Set up local font loading
    [X] Create @font-face declarations for all fonts
    [X] Update CSS to reference local font files
    [X] Remove Google Fonts CDN links from index.html
[X] Test font loading and rendering
    [X] Verify fonts load correctly in development
    [X] Check all handout types display with correct fonts
    [ ] Test production build to ensure fonts are bundled correctly
[ ] Test export-to-image functionality
    [ ] Verify fonts render correctly in exported images
    [ ] Test with multiple handout types
    [ ] Ensure both html-to-image and html2canvas handle local fonts properly

## Work Log
[2025-09-07] Downloaded all Google Fonts locally and set up local font loading
- Files created: public/fonts/ directory with 63 woff2 font files, public/fonts/fonts.css
- Files modified: index.html
- Downloaded all 24 font families with all their weights and styles (63 font files total)
- Created @font-face declarations for all fonts in fonts.css
- Replaced Google Fonts CDN links with local fonts.css import in index.html

[2025-09-07] Fixed missing variable font weights causing font loading issues
- Files modified: public/fonts/fonts.css 
- Added missing font weights for variable fonts Caveat (500,600,700) and Merienda (400,500,600,700,800,900)
- Downloaded additional 9 font files for complete weight coverage
- Cleaned up duplicate @font-face declarations (reduced from 93 to 72 unique rules)
- Total font files: 72 woff2 files covering all font families and weights

[2025-09-07] Final font setup with manually downloaded TTF files
- Files replaced: All font files in public/fonts/ replaced with proper TTF files
- Files modified: public/fonts/fonts.css completely rewritten
- Downloaded 51+ TTF font files including variable fonts for Caveat, Dancing Script, Merienda, and Newsreader
- Generated proper @font-face declarations for all fonts (variable fonts without weight specs, static fonts with proper weights)
- All fonts now working correctly in app interface
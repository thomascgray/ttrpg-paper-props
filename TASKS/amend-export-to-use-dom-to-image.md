# amend-export-to-use-dom-to-image
**Status**: In Progress

## Overview
We need to replace html2canvas with dom-to-image library in the export button feature to fix the issue where the crystal ball component's image isn't exporting properly. The crystal ball uses SVG displacement map filters that html2canvas doesn't support, but dom-to-image might handle these better.

## Task Context
- Current implementation uses html2canvas in `src/ExportButton.tsx`
- The crystal ball component (`src/renderer/CrystalBall.tsx`) uses SVG filters via `filterUrl: "crystal-ball-bulge-inner-circle"`
- These SVG displacement map filters aren't being captured by html2canvas
- The stand image (using a static file path) exports fine, but the main crystal ball image (with SVG filters) doesn't appear in exports
- dom-to-image is an alternative library that might handle complex SVG filters better
- The export button is working well otherwise - it's positioned at bottom-right, shows loading state, and copies to clipboard

## Blockers/Issues
- Random borders appearing in exported images - FIXED by using adjustClone to remove border styles

## TODO
[X] Research dom-to-image library capabilities and API
[X] Uninstall html2canvas and install dom-to-image-more
[X] Update ExportButton component to use dom-to-image-more
    [X] Replace html2canvas import with dom-to-image-more
    [X] Update the capture logic to use dom-to-image API
    [X] Maintain existing functionality (clipboard copy, fallback download, loading states)
    [X] Add TypeScript declarations for dom-to-image-more
[ ] Test the crystal ball export specifically
    [ ] Verify the crystal ball image with SVG filters exports correctly
    [ ] Test other handout types still work
[ ] Handle any edge cases or browser compatibility issues

## Work Log
[2025-09-06] Switched from html2canvas to dom-to-image-more for better SVG support
- Packages: Removed html2canvas, installed dom-to-image-more@3.7.1
- Files modified: src/ExportButton.tsx
- Files created: src/dom-to-image-more.d.ts (TypeScript declarations)
- Updated export logic to use domtoimage.toBlob() instead of html2canvas()
- Maintained all existing functionality (clipboard, fallback download, loading states)
- Ready for testing crystal ball SVG filter export

[2025-09-06] Fixed random borders appearing in exported images
- Files modified: src/ExportButton.tsx, src/dom-to-image-more.d.ts
- Added adjustClone callback to remove border/outline/boxShadow styles from cloned elements
- Added style overrides to explicitly set border: 'none' and outline: 'none'
- Removes border-related CSS classes during cloning process
- TypeScript definitions updated to include adjustClone and other options
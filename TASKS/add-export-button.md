# add-export-button
**Status**: In Progress

## Overview
We need to add a new feature where the user can click a CTA that's floating in the render area at the bottom of the screen (similar to the existing BackgroundSelector button) and when clicked, it exports an image of the content of .render-area-content to their clipboard. The implementation approach is to use HTML5 Canvas to capture the DOM content and then export it to the clipboard.

## Task Context
- The BackgroundSelector component (`src/BackgroundSelector.tsx`) already implements a floating button pattern that expands/collapses
- The button should be positioned at the bottom of the screen similar to BackgroundSelector
- Uses Valtio for state management (`src/appState.ts`)
- The render area content is in a div with class `.render-area-content`
- Mobile UI considerations are documented in `./CLAUDE/mobile-ui.md`
- Framework: React 19 with TypeScript
- Styling: Tailwind CSS
- Icons available via the Icon component (`src/Icon.tsx`)
- We'll likely use html2canvas library to convert DOM to canvas, then use Clipboard API to copy image

## Blockers/Issues
None currently

## TODO
[X] Research and install html2canvas library for DOM to canvas conversion
[X] Create new ExportButton component similar to BackgroundSelector
    [X] Implement floating button UI
    [X] Position it appropriately in render area
    [X] Use appropriate icon from Icon component
[X] Implement export functionality
    [X] Convert .render-area-content DOM to canvas using html2canvas
    [X] Convert canvas to blob
    [X] Copy image to clipboard using Clipboard API
[X] Add state management for export button if needed
    [X] Consider adding loading state during export
    [X] Handle success/error feedback
[X] Test the feature
    [X] Test on desktop browsers
    [X] Test on mobile devices
    [X] Ensure it doesn't interfere with existing BackgroundSelector

## Work Log
[2025-09-06] Implemented export button feature for capturing handout content
- Files created: src/ExportButton.tsx
- Files modified: src/App.tsx, package.json (added html2canvas dependency)
- Implemented floating export button positioned at bottom-right of render area
- Added html2canvas library to capture DOM content as image
- Implemented clipboard API to copy image to clipboard with fallback to download
- Added loading state and success feedback to the button
- Button changes from photo icon to check icon on successful export
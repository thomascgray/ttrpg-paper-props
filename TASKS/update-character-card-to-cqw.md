# Update Character Card to CQW Units
**Status**: In Progress

## Overview
Convert the CharacterCard component to use Container Query Width (CQW) units for responsive scaling, following the successful pattern established with the newspaper and newspaper clipping components. The character card currently uses fixed pixel values for width and font sizes. We need to make all layout and style use CQW units while maintaining proper responsive behavior.

## Task Context
- Reference completed task: `TASKS/✅ newspaper-clipping-vertical-cqw.md` - contains the breakthrough insights for proper CQW implementation
- Reference guide: `CLAUDE/cqw-relative-proportions.md` - comprehensive guide on CQW implementation patterns
- Key learnings from previous implementations:
  - **CRITICAL**: Remove `prose` classes from any Markdown components (conflicts with CQW)
  - Container queries should be on wrapper div, not main parent
  - ALL spacing must use CQW units (margins, padding, font sizes)
  - Both width AND height can work in CQW with proper setup
  - Config values represent proportions, not literal CQW values (no suffix in config)
  - Nested container contexts enable different scaling contexts
- Current CharacterCard implementation:
  - Uses fixed pixels for pageWidth (line 12 in renderer)
  - Font sizes use pixel calculations (lines 44, 57, 71)
  - Margins use percentage values (could be converted to CQW)
  - Has three text lines with different relative font sizes
- The handout config system uses tuples: `[defaultValue, inputHelper()]`
- See `CLAUDE/rendering-components.md` for renderer patterns
- See `CLAUDE/handout-configs.md` for handout config patterns

## Blockers/Issues
None currently

## TODO
[X] Update CharacterCardConfig in handoutConfigs.ts to use CQW units
    [X] Convert pageWidth from pixels to CQW-based range (no suffix in config)
    [X] Add pageHeight with CQW-based range (or use aspect ratio)
    [X] Update fontSize to use CQW proportions instead of percentage
    [X] Consider if separate font sizes needed for each text line
[X] Update CharacterCard.tsx renderer to use CQW units
    [X] Set up proper container query wrapper structure
    [X] Convert width to use CQW units from config
    [X] Convert all margins to CQW units
    [X] Apply CQW font sizes to text lines
    [X] Ensure no prose classes are present
    [X] Test with nested container contexts if needed
[X] Set appropriate defaults and ranges
    [X] Determine sensible default proportions for character card dimensions
    [X] Set appropriate font size ranges for readability
    [X] Test different aspect ratios
[X] Verify responsive behavior
    [X] Test scaling at different browser widths
    [X] Ensure content doesn't disappear/appear unexpectedly
    [X] Verify image scales properly with card
[X] Restructure config to give each text line its own styling properties
    [X] Create nested objects for lineOne, lineTwo, lineThree
    [X] Each line has: content, font, fontSize, fontWeight, textAlign
    [X] Update renderer to use new nested structure
    [X] Remove global font, fontWeight, textAlign properties

## Work Log
[2025-09-21] Started task to convert CharacterCard to CQW units
- Files reviewed: src/renderer/CharacterCard.tsx, src/handoutConfigs.ts
- Analyzed current implementation using fixed pixels and percentages
- Created task document with context from previous CQW conversions

[2025-09-21] Completed CharacterCard CQW conversion implementation
- Files modified: src/handoutConfigs.ts, src/renderer/CharacterCard.tsx
- Converted CharacterCardConfig to use CQW-based dimensions:
  - pageWidth: 35cqw (range 20-60)
  - pageHeight: 50cqw (range 30-80)
- Created nested fontSizes config object with separate controls for each text line:
  - lineOne: 3cqw (range 1-6)
  - lineTwo: 1.8cqw (range 0.5-4)
  - lineThree: 1.2cqw (range 0.5-3)
- Updated CharacterCard renderer with proper container query setup:
  - Main container uses width and height in CQW units
  - Added container query wrapper div with containerType: "inline-size"
  - Converted all margins, padding, and spacing to CQW units
  - Image margins: 5cqw sides, 3cqw bottom
  - Text padding: 5cqw left/right, 3cqw bottom
  - Line spacing: 1cqw between text lines
- Following established CQW patterns from newspaper clipping implementation
- TypeScript compilation successful with no errors

[2025-09-21] Restructured CharacterCard config for independent line styling
- Files modified: src/handoutConfigs.ts, src/renderer/CharacterCard.tsx
- Reorganized config to use nested objects for each text line:
  - lineOne: { content, font, fontSize, fontWeight, textAlign }
  - lineTwo: { content, font, fontSize, fontWeight, textAlign }
  - lineThree: { content, font, fontSize, fontWeight, textAlign }
- Removed global font, fontWeight, and textAlign properties
- Updated renderer to apply individual styling to each line
- Each line now has complete control over its appearance
- Better defaults: lineOne bold/center, lineTwo normal/center, lineThree light/center
- TypeScript compilation successful
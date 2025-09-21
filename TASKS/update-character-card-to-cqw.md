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
[ ] Update CharacterCardConfig in handoutConfigs.ts to use CQW units
    [ ] Convert pageWidth from pixels to CQW-based range (no suffix in config)
    [ ] Add pageHeight with CQW-based range (or use aspect ratio)
    [ ] Update fontSize to use CQW proportions instead of percentage
    [ ] Consider if separate font sizes needed for each text line
[ ] Update CharacterCard.tsx renderer to use CQW units
    [ ] Set up proper container query wrapper structure
    [ ] Convert width to use CQW units from config
    [ ] Convert all margins to CQW units
    [ ] Apply CQW font sizes to text lines
    [ ] Ensure no prose classes are present
    [ ] Test with nested container contexts if needed
[ ] Set appropriate defaults and ranges
    [ ] Determine sensible default proportions for character card dimensions
    [ ] Set appropriate font size ranges for readability
    [ ] Test different aspect ratios
[ ] Verify responsive behavior
    [ ] Test scaling at different browser widths
    [ ] Ensure content doesn't disappear/appear unexpectedly
    [ ] Verify image scales properly with card

## Work Log
[2025-09-21] Started task to convert CharacterCard to CQW units
- Files reviewed: src/renderer/CharacterCard.tsx, src/handoutConfigs.ts
- Analyzed current implementation using fixed pixels and percentages
- Created task document with context from previous CQW conversions
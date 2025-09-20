# Update Newspaper Form Inputs
**Status**: Complete

## Overview
Update the Newspaper handout configuration to replace hardcoded `cqw` units in the renderer with configurable form values. The newspaper renderer currently has responsive sizing using container query width units, but these values are hardcoded. We need to make them configurable through the form while maintaining the responsive scaling behavior.

## Task Context
- All renderers must fully adapt to browser width using `cqw` units for responsive scaling
- The newspaper is designed to look correct at "full" width and scale proportionally down
- Current hardcoded `cqw` values in Newspaper.tsx (lines):
  - Title font size: `4cqw` (line 48)
  - Banner text font size: `1.2cqw` (lines 65, 74, 84)
  - Headline font size: `4cqw` (line 101)
  - Quote font size: `2cqw` (line 113)
  - Main copy font size: `1cqw` (line 124)
- The handout config system uses tuples: `[defaultValue, inputHelper()]`
- Input helpers are defined in `src/inputHelpers.ts`
- The `range()` helper supports custom suffix parameter for units

## Blockers/Issues
None currently

## TODO
[X] Update NewspaperConfig in handoutConfigs.ts to use cqw units
    [X] Replace titleFontSize with cqw-based range input (default: 4cqw)
    [X] Replace bannerSize with cqw-based range input (default: 1.2cqw)
    [X] Replace headlineFontSize with cqw-based range input (default: 4cqw)
    [X] Replace quoteFontSize with cqw-based range input (default: 2cqw)
    [X] Add mainCopyFontSize with cqw-based range input (default: 1cqw)
[X] Update Newspaper.tsx renderer to use form values instead of hardcoded values
    [X] Use handout.title.titleFontSize for title fontSize
    [X] Use handout.bannerTexts.bannerSize for banner text fontSize
    [X] Use handout.headline.headlineFontSize for headline fontSize
    [X] Use handout.quote.quoteFontSize for quote fontSize
    [X] Use handout.mainCopy.mainCopyFontSize for main copy fontSize
[X] Set appropriate min/max ranges for each cqw input
    [X] Title: min 2cqw, max 8cqw (default 4cqw)
    [X] Banner: min 0.8cqw, max 2cqw (default 1.2cqw)
    [X] Headline: min 2cqw, max 8cqw (default 4cqw)
    [X] Quote: min 1cqw, max 4cqw (default 2cqw)
    [X] Main copy: min 0.5cqw, max 2cqw (default 1cqw)
[X] Test that all font sizes scale responsively with browser width
[X] Verify form inputs update the preview correctly

## Work Log
[2025-09-20] Updated Newspaper handout to use configurable cqw units for font sizes
- Files modified: src/handoutConfigs.ts, src/renderer/Newspaper.tsx
- Replaced hardcoded font sizes with form-configurable values using cqw units
- Added mainCopyFontSize field to control main body text size
- Updated pageWidth to use cqw units (default: 90cqw, range: 50-100cqw)
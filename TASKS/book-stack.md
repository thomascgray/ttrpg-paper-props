# Book Stack

**Status**: In Progress

## Overview

We are adding a new handout type called "Book Stack" that renders an image of stacked books with customizable text labels on each book spine. This will be categorized under "Objects" (type: "object") handouts.

The handout will:
- Render a selectable book stack image (starting with `book-stack-2915944_1920.png`)
- Have inputs for each "book" in the stack (the first image has 7 books)
- Each book input contains: text, font, colour, orientation, position, etc.
- Use CQW units for responsive sizing like other handouts
- Have a page width control similar to SciFiHologram

## Task Context

- Follow the add-new-handout-type guide: `./CLAUDE/add-new-handout-type.md`
- Use CQW patterns from: `./CLAUDE/cqw-relative-proportions.md`
- Reference `SciFiHologram.tsx` for page width pattern implementation
- Book stack images live in: `public/images/book_stacks/`
- Current images: `book-stack-2915944_1920.png` (7 books)
- Type should be `"object"` to appear under "Objects w/ Superimposed Text"
- Each book stack image will need its own configuration for book positions/rotations
- Consider using a similar pattern to `textFull()` helper for book text properties, but customized for book spine text (includes position/rotation)

## Blockers/Issues

None currently

## TODO

[X] Create the BookStack config in `handoutConfigs.ts`
  [X] Add page width control (empty suffix, use cqw in component)
  [X] Add book stack image selector dropdown
  [X] Add array of book inputs (each with text, font, colour, fontSize, position, rotation)
  [X] Add to `allConfigs` array with type "object"
[X] Create the BookStack renderer component in `src/renderer/BookStack.tsx`
  [X] Use CQW pattern for responsive sizing
  [X] Render the selected book stack image
  [X] Overlay text on each book spine based on the book inputs
  [X] Position/rotate text according to each book's configuration
[X] Add routes in `src/routes.ts`
[X] Update `App.tsx` with import and conditional rendering
[X] Test that the handout appears in selector and renders correctly

## Work Log

[2026-01-10] Initial implementation of BookStack handout type
- Created `bookSpineText` helper function in `src/handoutConfigs.ts` to generate consistent config for each book spine (text, font, fontSize, fontWeight, colour, xOffset, yOffset, rotation)
- Created `BookStackConfig` with positioning, pageWidth, bookStackImage selector, and 7 book spine configs (book1-book7)
- Added BookStackConfig to `allConfigs` array with type "object"
- Created renderer component `src/renderer/BookStack.tsx` using CQW pattern for responsive sizing
- Added routes `/book-stack` in `src/routes.ts`
- Added import and conditional rendering in `src/App.tsx`
- Verified build succeeds with `bun run build`

Files modified:
- src/handoutConfigs.ts (added bookSpineText helper and BookStackConfig)
- src/renderer/BookStack.tsx (new file)
- src/routes.ts (added BookStack routes)
- src/App.tsx (added import and conditional rendering)

[2026-01-10] Fixed font and X offset issues in BookStack renderer
- Font: Changed from inline `fontFamily` style to className (font picker returns Tailwind classes like `font-serif`)
- FontWeight: Moved from span className to parent div className
- X offset: Changed from `left: ${50 + book.xOffset}%` to `left: calc(50% + ${book.xOffset}cqw)` for proper CQW-based positioning

Files modified:
- src/renderer/BookStack.tsx


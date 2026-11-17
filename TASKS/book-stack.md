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
- **Single source of truth for book defaults**: `src/bookStackDefaults.ts`
- **To add a new book stack image**:
  1. Add image to `public/images/book_stacks/`
  2. Add entry to `BOOK_STACK_DEFAULTS` in `src/bookStackDefaults.ts`
  3. Add label to `BOOK_STACK_LABELS` in same file
  4. Done - form and reset button handle everything automatically
- When switching images, books sync automatically (truncate if fewer, add defaults if more)

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
[X] Refactor to single source of truth for book defaults
  [X] Create `src/bookStackDefaults.ts` with all defaults in one place
  [X] Create `src/components/BooksArray.tsx` form component
  [X] Add `booksArray` input helper
  [X] Update BookStackConfig to use dynamic `books` array instead of `book1`-`book7`
  [X] Update renderer to iterate over `books` array
  [X] Wire up automatic sync when switching book stack images
[ ] Test the refactored implementation
[ ] Add more book stack images

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

[2026-01-12] Refactored to single source of truth for book defaults
- Created `src/bookStackDefaults.ts` containing:
  - `BOOK_STACK_DEFAULTS`: All book position/text/style data per image
  - `BOOK_STACK_LABELS`: Display labels for image selector
  - `createBooksFromDefaults()`: Creates books array with IDs
  - `syncBooksToImage()`: Syncs books when switching images (keeps user text, truncates/extends as needed)
- Created `src/components/BooksArray.tsx`: Collapsible form component for editing books array
- Added `booksArray` input helper to `src/inputHelpers.ts`
- Added `books_array` type to `src/types.ts`
- Added BooksArray case to `src/FormRenderer.tsx`
- Refactored `BookStackConfig` to use dynamic `books` array instead of static `book1`-`book7` fields
- Removed old `bookSpineText` helper and `bookStackPositionDefaults` export
- Updated `src/renderer/BookStack.tsx` to iterate over `handout.books` array

Files created:
- src/bookStackDefaults.ts
- src/components/BooksArray.tsx

Files modified:
- src/inputHelpers.ts
- src/types.ts
- src/FormRenderer.tsx
- src/handoutConfigs.ts
- src/renderer/BookStack.tsx


## PR Description

- new handouts
    - BookStack (object): `BookStack.tsx`, 9 book images in `public/images/books/`, per-book text/font/colour/rotation via `booksArray` input and `BooksArray.tsx`; `bookStackDefaults.ts` is the single source of defaults, books sync when switching image
    - Gravestone: `Gravestone.tsx`, 12 stone images in `public/images/gravestones/`, carved-stone text (`.carved-stone-*` in `index.css`, two stacked layers) and `roughEdgesSubtle` filter in `main.tsx`
    - Chalkboard: `Chalkboard.tsx`, slate with chalk text and optional frame, inline SVG chalk-fade filter
    - Envelope: `Envelope.tsx` + `EnvelopePostmark.tsx`, front/back, flap styles, wax seal, postmark
    - selector thumbnails in `public/handout_examples/`, routes in `routes.ts`, wiring in `App.tsx`

- form inputs
    - new `radio` and `image_radio` inputs (`RadioGroup.tsx`, `ImageRadioGroup.tsx`)
    - new `action` input: buttons that transform handout data via `onAction` / `handleFormAction` in `App.tsx`; docs in `CLAUDE/action-buttons.md`
    - `paragraphArray` options: `fontSizeRange`, `newParagraphDefaults`, `showRotation` (per-paragraph rotation slider)

- export
    - `ExportImageButton.tsx` copies global SVG filters into the captured node so rough-edge effects survive export
    - button label/icon switch to "Copy to clipboard" in clipboard mode

- misc
    - Fredericka the Great font added (`fonts.css`, `FontSelector`, `enums.ts`)
    - `PaperTextureSelect` grid shows 3-4 columns on wide screens
    - `CrtScreen`: wider max width, `pageWidth` fallback for old saved data
    - `BookCover`: applies `textTopMargin`
    - `App.tsx`: image licensing notes in about section, dev-only "Delete all local data" button
    - `scripts/handout-thumbnail.ts` generates selector thumbnails from the dev server
    - specs added in `SPECS/` for chalkboard, envelope, tree trunk carving

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# important development notes

- never try to run `bun dev` to start the development server - i'm almost always running the server anyway.

If the user has asked you to do some work, and it involves modifying a renderer component (like the components in `src/renderer/`), then refer to ./CLAUDE/rendering-components.md document.

If the user has asked you to do some work, and it involves modifying a handout config (like the configs in `src/handoutConfigs.ts`), then refer to ./CLAUDE/handout-configs.md document.

If the user has asked you to do some work related to mobile UI, drawer behavior, or touch interactions, then refer to ./CLAUDE/mobile-ui.md document.

### CLI Development

- `bun dev` - Start the development server (default port 5173)
- `bun install` - Install dependencies (uses Bun package manager)

### CLI Build

- `bun run build` - Build for production

### CLI Linting

- `bun x tsx` - Run TypeScript compiler for type checking

## Architecture Overview

### Core Technology Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Dexie (IndexedDB wrapper) for local storage
- **State Management**: Valtio for global app state
- **Package Manager**: Bun

### Project Structure

#### Database Layer (`src/database.ts`, `src/db.ts`)

- Uses Dexie for local IndexedDB storage
- Stores handout configurations as "versions" (snapshots)
- Each handout type has a transient record for current edits
- App state persists selected handout type and version

#### Handout Types (`src/handoutConfigs.ts`)

All handout configurations are defined here. Each config uses the tuple pattern with default values and input helper functions. Available types:

- Newspaper
- NewspaperClipping
- CharacterCard
- PlainLetter
- BookCover
- LabelledLiquid
- HangingWoodenSign
- ThreePanelDirectionalSign
- CrtScreen
- PaperMap
- CrystalBall

#### Renderer Components (`src/renderer/`)

Each handout type has a corresponding renderer component that takes handout data and renders the visual output. Components should be pure and only depend on the data prop.

#### Form System (`src/FormRenderer.tsx`, `src/components/`)

- Dynamic form generation based on handout configs
- Input components map to helper functions in `inputHelpers.ts`
- Form changes update the transient database record
- Real-time preview updates as users modify values

### Key Patterns

#### Config to Form Flow

1. Handout config defines structure with tuples: `[defaultValue, inputHelper()]`
2. `extractConfigAsFormConfig()` transforms config into form structure
3. `FormRenderer` generates UI from form config
4. Changes update transient database record
5. Renderer components read from database and display results

#### State Management

- Global app state in `appState.ts` using Valtio
- Tracks selected handout type and version ID
- Database queries use `useLiveQuery` for reactive updates
- Form changes immediately update transient records

## Important Conventions

### TypeScript

- Strict mode enabled
- Use type imports: `import type { ... }`
- Configs must satisfy `HandoutConfig` type

### Styling

- Tailwind CSS for styling
- Custom CSS in `index.css` and `ink.css`
- Paper textures and effects use CSS classes

### Database Versioning

- APP_VERSION in `database.ts` controls schema
- Database resets on version mismatch
- Versions stored with timestamp for history

### Form Inputs

All form inputs use helper functions from `inputHelpers.ts`:

- `range()` - Numeric sliders
- `text()` / `textArea()` - Text inputs
- `fontPicker()` - Font selection
- `colour()` - Color picker
- `imageInput()` - Image upload/URL
- `paragraphArray()` - Dynamic paragraph lists
- `select()` - Dropdown selections

### Component Guidelines

- Renderer components should be pure functions
- Use markdown processing for text content
- Support positioning (rotation, zoom, offset) where applicable
- Implement proper TypeScript types for handout data

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server (default port 5173)
- `bun install` - Install dependencies (uses Bun package manager)

### Build
- `bun run build` - Build for production

### Linting
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

#### Configuration System
The project is migrating from old-style configs to new database-backed configs:

**Old Style (config.ts)**:
- Properties are nested objects with `value` fields
- Uses snake_case naming (e.g., `paper_tint`, `font_size`)
- Access pattern: `handout.paper_tint.value`

**New Style (db.ts)**:
- Uses tuple format: `[defaultValue, configObject]`
- Uses camelCase naming (e.g., `paperTint`, `fontSize`)
- After `ExtractConfigValues`, access properties directly without `.value`
- Type: `ExtractConfigValues<typeof ConfigName>`

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

### Migration Notes

When converting components from old to new style:
1. Update imports from `config.ts` to use `db.ts`
2. Create type alias: `type ComponentData = ExtractConfigValues<typeof ConfigName>`
3. Remove all `.value` suffixes from property access
4. Convert snake_case to camelCase
5. Update positioning properties (e.g., `x_offset` → `xOffset`)

### Components Already Converted
- CharacterCard
- PlainLetter
- BookCover (added `select()` and `blendMode()` helpers)

### Components Pending Conversion
- Newspaper
- NewspaperClipping
- LabelledLiquid

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
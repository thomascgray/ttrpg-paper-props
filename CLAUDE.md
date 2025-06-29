# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TTRPG Paper Props is a React-based web application for creating printable handouts and props for tabletop roleplaying games. The application generates various types of props including newspapers, character cards, handwritten notes, labeled bottles, and book covers.

Live deployment: https://handouts.tomg.cool/

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite + Tailwind CSS watch)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## Architecture

### Core Architecture Pattern

The application uses a configuration-driven approach where each prop type is defined by:

1. A configuration object in `src/config.ts` that defines available input fields
2. A form component in `src/props/[PropType]/form.tsx` (optional custom form)
3. A renderer component in `src/renderer/[PropType].tsx` that displays the final prop

### Key Components

- **App.tsx**: Main application with split-view layout (form on left, preview on right)
- **ConfigFormRenderer.tsx**: Dynamically renders forms based on configuration
- **src/context.ts**: React Context for state management with localStorage persistence
- **src/components/**: Reusable form input components (ColorPicker, FontSelector, etc.)

### Data Flow

1. User selects a handout type from the dropdown
2. ConfigFormRenderer generates a form based on the configuration
3. Form inputs update the global state via React Context
4. Renderer component displays the prop in real-time
5. State is automatically persisted to localStorage

### Available Prop Types

- **NEWSPAPER**: Full newspaper front page
- **NEWSPAPER_CLIPPING**: Vertical newspaper clipping
- **CHARACTER_CARD**: Character cards with images
- **PLAIN_LETTER**: Markdown-based letters/documents
- **BOOK_COVER**: Book covers with customizable text
- **LABELLED_LIQUID**: Bottles/vials with labels

## Important Development Notes

### CSS Architecture

- Tailwind CSS for utility classes
- Custom effects in `src/ink.css` (ink splatter, paper textures)
- Build CSS is generated from Tailwind processing

### No Testing or Linting

Currently, the project has:

- No test framework configured
- No linting setup (ESLint/Prettier)
- TypeScript strict mode is the only code quality check

### State Persistence

- All form data is saved to localStorage automatically
- Version history is maintained with timestamps
- Users can save/load different configurations

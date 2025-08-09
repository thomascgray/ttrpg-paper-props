# Background Selector System

## Overview

The Background Selector is a feature that allows users to customize the background of the render area in the TTRPG Paper Props application. It provides three different background types with various customization options.

## Architecture

### Components

1. **BackgroundSelector Component** (`src/BackgroundSelector.tsx`)
   - Main UI component that provides the background selection interface
   - Positioned absolutely at bottom-left of the render area
   - Toggle button with photo icon to open/close the selector
   - Contains radio buttons for background type selection and type-specific controls

2. **App State** (`src/appState.ts`)
   - Manages all background-related state using Valtio proxy
   - State properties:
     - `backgroundSelectorState`: "open" | "closed"
     - `backgroundType`: "color" | "gradient" | "custom"
     - `backgroundColor`: Flat color value
     - `backgroundGradientStart/End`: Gradient color values
     - `backgroundGradientType`: "linear" | "radial" | "conic"
     - `backgroundGradientAngle`: Angle for linear/conic gradients
     - `backgroundGradientPosition`: Position for radial gradients
     - `backgroundCustomImage`: Image data (URL or base64)
     - `backgroundImageBlur`: Boolean for blur effect
     - `backgroundImageZoom`: Zoom level multiplier

3. **Render Area** (`src/App.tsx`)
   - Uses a layered approach with separate background and content divs
   - Background layer has `pointer-events-none` to prevent click interference
   - Content layer has `z-10` to ensure it's above the background

## Background Types

### 1. Flat Color
- Single color background
- Uses `ColourPicker` component with preset color swatches
- Applied via CSS `backgroundColor` property

### 2. Gradient
- Three gradient types available:
  - **Linear**: Straight gradient with adjustable angle (0-360°)
  - **Radial**: Circular gradient with 9 position options
  - **Conic**: Rotating gradient with adjustable angle
- Features:
  - Two color pickers for start and end colors
  - Swap button to quickly exchange colors
  - Type-specific controls (angle slider or position dropdown)

### 3. Custom Image
- Supports multiple input methods via `ImageInput` component:
  - URL input
  - File upload
  - Clipboard paste
- Features:
  - Blur toggle (applies 5px blur filter)
  - Zoom control (50% to 300%)
- Images are:
  - Centered in the render area
  - Non-repeating
  - Scaled based on zoom level

## Implementation Details

### CSS Background Application

The background is applied using inline styles on a dedicated background div:

```javascript
// Flat color
backgroundColor: appState.backgroundColor

// Linear gradient
background: `linear-gradient(${angle}deg, ${startColor}, ${endColor})`

// Radial gradient
background: `radial-gradient(circle at ${position}, ${startColor}, ${endColor})`

// Conic gradient
background: `conic-gradient(from ${angle}deg, ${startColor}, ${endColor})`

// Custom image
backgroundImage: `url(${imageData})`
backgroundSize: `${zoom * 100}% auto`
backgroundPosition: "center center"
backgroundRepeat: "no-repeat"
filter: blur ? "blur(5px)" : "none"
```

### Z-Index Management

- BackgroundSelector: `z-50` (highest priority)
- Content layer: `z-10`
- Background layer: default (lowest)

This ensures proper layering and clickability of all elements.

### State Persistence

The background configuration is stored in the global app state managed by Valtio, which auto-saves to the database when changed. This allows background settings to persist across sessions.

## User Workflow

1. Click the photo icon button to open the selector
2. Choose a background type via radio buttons
3. Configure the selected background type:
   - **Color**: Pick from swatches or use color picker
   - **Gradient**: Select type, choose colors, adjust angle/position
   - **Image**: Upload/paste/link image, adjust blur and zoom
4. Background updates in real-time as settings change
5. Click the photo icon again to close the selector

## Future Enhancements

- Predefined background images (currently disabled)
- Additional gradient types or custom gradient stops
- Background opacity controls
- Background blend modes
- Save/load background presets
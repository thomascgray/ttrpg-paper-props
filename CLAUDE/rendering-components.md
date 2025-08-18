# Important development notes - Rendering component

## Positioning System

- If a component has positioning props, position the x and y offset using translate x and y
- Positioning is handled in `App.tsx` with a transform on the render-area-content div:
  ```jsx
  transform: `
    translate(${xOffset}%, ${yOffset}%)
    rotate(${rotation}deg) 
    scale(${zoom})
  `
  ```
- Positioning data is stored in `data.positioning` object with properties:
  - `rotation`: degrees of rotation (0-360)
  - `zoom`: scale factor (0.1-6)
  - `xOffset`: horizontal offset as percentage
  - `yOffset`: vertical offset as percentage

## Positioning Controls Component

The `PositioningControls` component provides UI for adjusting position:
- Uses `AngleSlider` from Mantine for rotation
- Custom `XYPicker` component for offset adjustment  
- `RangeInput` for zoom control
- Reset button to restore defaults
- Opens/closes via `appState.positioningControls` state

## Positioning Reset Behavior

When switching handout types:
- All positioning values reset to defaults (zoom: 1, rotation: 0, offsets: 0)
- This happens in `HandoutTypeSelector.handleHandoutTypeChange()`
- Updates the database transient record directly

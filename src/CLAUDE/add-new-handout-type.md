# Adding a New Handout Type

This guide outlines the steps required to add a new handout type to the TTRPG Paper Props system.

## Required Steps

### 1. Create the Renderer Component
**File:** `src/renderer/[HandoutName].tsx`

```tsx
import React from 'react';
import { [HandoutName]Config } from '../handoutConfigs';
import { ExtractConfigValues } from '../types';

type [HandoutName]Data = ExtractConfigValues<typeof [HandoutName]Config>;

export const [HandoutName]: React.FC<{ handout: [HandoutName]Data }> = ({ handout }) => {
  // Access handout properties directly (e.g., handout.image, not handout.data.image)
  return (
    <div>
      {/* Your renderer implementation */}
    </div>
  );
};
```

### 2. Add Configuration to handoutConfigs.ts
**File:** `src/handoutConfigs.ts`

Add before the `allConfigs` array:
```typescript
export const [HandoutName]Config = {
  // Add your config properties using input helpers
  image: ["", imageInput()],
  text: ["Default text", text({ name: "Label" })],
  // etc...
} satisfies HandoutConfig;
```

Then add to the `allConfigs` array:
```typescript
{
  name: "[HandoutName]",
  displayName: "[Display Name]",
  caption: "[Description shown in selector]",
  type: "object" | "digital_paper" | "scifi_screens" | "wooden_signs",
  config: [HandoutName]Config,
} as const,
```

**IMPORTANT**: You MUST add the handout to the `allConfigs` array! This is what makes the handout type available in the TypeScript type system. Without this step, you'll get TypeScript errors like "This comparison appears to be unintentional because the types have no overlap" when trying to render the handout.

### 3. Add Routes
**File:** `src/routes.ts`

Add to both route mappings:
```typescript
// In the routes object:
"/[url-path]": "[HandoutName]",

// In the handoutToRoute object:
[HandoutName]: "/[url-path]",
```

### 4. Update App.tsx
**File:** `src/App.tsx`

1. Add import at the top:
```typescript
import { [HandoutName] } from "./renderer/[HandoutName]";
```

2. Add conditional rendering in the preview section (find where other handouts are rendered):
```tsx
{currentHandoutTransientRow.type === "[HandoutName]" &&
  appState.selectedHandoutType === "[HandoutName]" && (
    <[HandoutName] handout={currentHandoutTransientRow.data} />
  )}
```

## Key Points to Remember

1. **Type Pattern**: Use `ExtractConfigValues<typeof [HandoutName]Config>` for type safety
2. **Data Access**: Access properties directly from `handout` (not `handout.data`)
3. **Config Types**: Choose appropriate category type for HandoutTypeSelector grouping:
   - `"object"` - Objects w/ Superimposed Text
   - `"digital_paper"` - 'Pseudo' Paper / Print
   - `"scifi_screens"` - Sci-fi Screens
   - `"wooden_signs"` - Wooden Signs
   - Or use a custom type (like `"test"`) to hide it from the selector
4. **Input Helpers**: Use helpers from `inputHelpers.ts`:
   - `imageInput()` - Image upload/URL
   - `text()` / `textArea()` - Text inputs
   - `colour()` - Color picker
   - `fontPicker()` - Font selection
   - `range()` - Numeric sliders
   - `boolean()` - Checkboxes
   - `select()` - Dropdowns
   - `paragraphArray()` - Dynamic paragraph lists

## Verification

After adding all components, run:
```bash
bun x tsc --noEmit
```

This will catch any TypeScript errors in your implementation.

## Example: Crystal Ball

A minimal example that takes just an image:

**Config:**
```typescript
export const CrystalBallConfig = {
  image: ["", imageInput()],
} satisfies HandoutConfig;
```

**Renderer:**
```tsx
type CrystalBallData = ExtractConfigValues<typeof CrystalBallConfig>;

export const CrystalBall: React.FC<{ handout: CrystalBallData }> = ({ handout }) => {
  const { image } = handout;
  return <div>{image && <img src={image} alt="Crystal ball vision" />}</div>;
};
```

## Hidden Handout Example: Test

To create a handout accessible only via URL (not in the selector):

1. Use a custom type in the config:
```typescript
{
  name: "Test",
  displayName: "Test",
  caption: "A test handout for development",
  type: "test",  // Custom type not used in HandoutTypeSelector
  config: TestConfig,
} as const,
```

2. The handout will be accessible at `/test` but won't appear in the dropdown since HandoutTypeSelector only shows specific types.
# Action Buttons in Handout Configs

## Overview

Action buttons allow handout configs to define clickable buttons that transform data. The handler function receives current data and returns new data - App.tsx just applies the result. This keeps action logic self-contained in configs.

## The `action()` Helper

```typescript
action({
  name: string;                    // Button label (or prefix if using dynamicLabel)
  handler: (currentData) => newData;  // Transform function
  variant?: "primary" | "secondary";
  dynamicLabel?: {
    path: string;                  // Data path to read from
    labels: Record<string, string>; // Value → display label mapping
  };
})
```

## Key Patterns

### Basic Action
```typescript
resetSomething: [
  null,
  action({
    name: "Reset to Defaults",
    handler: (data) => ({
      ...data,
      someField: defaultValue,
    }),
  }),
],
```

### Variant-Dependent Defaults (Reset Based on Selector)

When a handout has a "base" selector (like an image) and other fields that should reset to match:

1. Define a defaults map keyed by the selector value:
```typescript
export const myDefaults: Record<string, FieldDefaults> = {
  "/images/variant-a.png": { field1: 10, field2: 20 },
  "/images/variant-b.png": { field1: 15, field2: 25 },
};
```

2. Create an action that looks up and applies the right defaults:
```typescript
resetPositions: [
  null,
  action({
    name: "Reset to defaults for",
    handler: (currentData) => {
      const selectedVariant = currentData.variantSelector;
      const defaults = myDefaults[selectedVariant];
      if (!defaults) return currentData;

      return {
        ...currentData,
        ...defaults,  // or spread into nested objects as needed
      };
    },
    dynamicLabel: {
      path: "variantSelector",
      labels: {
        "/images/variant-a.png": "Variant A",
        "/images/variant-b.png": "Variant B",
      },
    },
  }),
],
```

### Dynamic Labels

Makes button text reflect current data state:
- `name` becomes a prefix
- `dynamicLabel.path` specifies which field to read
- `dynamicLabel.labels` maps values to display strings
- Result: `"Reset to defaults for "Variant A""`

## Architecture

- **inputHelpers.ts**: Defines `action()` helper
- **FormRenderer.tsx**: Renders button, calls `onAction(handler)` on click
- **App.tsx**: Generic handler that applies `handler(currentData)` to database
- **types.ts**: `action` included in `ConfigTuple` union

## Adding New Actions

1. Add the action to your config using `action()` helper
2. Define handler logic inline or reference external defaults map
3. Optionally add `dynamicLabel` for context-aware button text
4. No changes needed in App.tsx - it's fully generic

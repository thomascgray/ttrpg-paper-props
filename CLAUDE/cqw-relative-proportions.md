# CQW Relative Proportions - Implementation Guide

This document captures the learnings and patterns for implementing proper responsive scaling using Container Query Width (CQW) units in renderer components.

## The Parent Container Query Context

**CRITICAL UNDERSTANDING**: All handout components are rendered inside `App.tsx` within a parent container that has `containerType: "inline-size"` set on the `.render-area` div (line 207-212 in App.tsx). This establishes the container query context that makes viewport-responsive sizing work.

```jsx
// In App.tsx - this is the parent container for all handouts
<div
  style={{
    containerType: "inline-size",  // ← This enables CQW for child components
  }}
  className="render-area w-full h-full overflow-y-auto overflow-x-hidden flex items-center justify-center"
>
  {/* All handout components render here */}
</div>
```

This means:
- **CQW units in handout components are relative to the `.render-area` container width**
- As the browser window resizes, the `.render-area` resizes, and all CQW-based components resize proportionally
- This is why components use `cqw` for their outer width - they're sizing relative to this parent container

## Key Principles

### 1. Remove Prose Classes from Markdown
**CRITICAL**: The `prose` class conflicts with CQW units and causes layout issues.

```jsx
// ❌ WRONG - prose class interferes with CQW scaling
<Markdown className="prose copy-markdown ${handout.font}">

// ✅ CORRECT - remove prose, keep other classes
<Markdown className="copy-markdown ${handout.font}">
```

### 2. Container Query Setup - The Two Modes

Container queries control whether content maintains aspect ratio or flows naturally.

#### Mode 1: Maintain Aspect Ratio (Default for most handouts)
Use `containerType: "inline-size"` - everything scales proportionally together.

```jsx
// ✅ CORRECT - Maintains aspect ratio, everything scales together
<div style={{ width: `${handout.pageWidth}cqw` }} className="xl:max-w-[24em] max-w-[20em]">
  <div
    style={{ containerType: "inline-size" }}
    className="w-full h-full"
  >
    {/* Content with CQW font sizes - scales proportionally */}
  </div>
</div>
```

**Use when**: You want the entire handout to scale as one unit (newspapers, cards, signs, screens, polaroids)

#### Mode 2: Natural Flow (For documents like letters)
Use `containerType: "normal"` - width is controlled but height flows with content.

```jsx
// ✅ CORRECT - Width controlled, height flows naturally
<div style={{ width: `${handout.pageWidth}cqw` }} className="xl:max-w-[24em] max-w-[20em]">
  <div
    style={{ containerType: "normal" }}
    className="w-full h-full"
  >
    {/* Content with CQW font sizes - width is fixed, height grows */}
  </div>
</div>
```

**Use when**: You want content to reflow as width changes (letters, documents where height should grow)

**Pro Tip**: Make this configurable with a `maintainAspectRatio` boolean config:
```jsx
containerType: handout.maintainAspectRatio ? "inline-size" : "normal"
```

### 3. Width Units: Use `cqw` for Viewport-Responsive Outer Container

**CRITICAL LEARNING**: The outer container width should use `cqw` units to be responsive to the parent `.render-area` container.

```jsx
// ✅ CORRECT - using cqw makes component responsive to viewport/parent container
<div style={{ width: `${handout.pageWidth}cqw` }} className="xl:max-w-[24em] max-w-[20em]">

// ❌ WRONG - using em makes width fixed relative to font size, not viewport
<div style={{ width: `${handout.pageWidth}em` }}>
```

**Why**:
- `cqw` makes the component width relative to the parent `.render-area` container (which is viewport-responsive)
- As the browser window resizes, `.render-area` resizes, and `cqw` values update proportionally
- Responsive breakpoint classes like `xl:max-w-[24em] max-w-[20em]` provide upper bounds
- The inner `containerType: "inline-size"` creates a NEW container query context for internal CQW units

### 4. Config Structure

**IMPORTANT**: Use **empty suffix** (`suffix: ""`) for the outer width config, then append `cqw` in the component!

```javascript
// ✅ CORRECT - empty suffix, component adds cqw manually
pageWidth: [50, range({ name: "Page Width", min: 20, max: 80, suffix: "" })],

// Component then uses it like:
// <div style={{ width: `${handout.pageWidth}cqw` }}>

// ✅ CORRECT - cqw suffix for internal spacing (used directly)
padding: [6, range({ name: "Padding", min: 0, max: 20, suffix: "cqw" })],
fontSize: [1.4, range({ name: "Font Size", min: 0.5, max: 6, step: 0.1, suffix: "cqw" })],

// Component uses these directly:
// <div style={{ padding: `${handout.padding}cqw` }}>
```

### 5. Font Size Ranges for CQW

When using CQW for font sizes, typical ranges:
- **Body text**: 0.5 - 6 cqw (step: 0.1)
- **Headings**: 2 - 8 cqw (step: 0.1)
- **Default body**: ~1.4 cqw

```javascript
// In ParagraphArray component
<RangeInput
  label="Font Size"
  min={0.5}
  max={6}
  step={0.1}
  suffix="cqw"
/>

// In config default
fontSize: 1.4  // Default for body text
```

### 6. Internal Spacing Uses CQW

For consistent scaling, **internal spacing** should use CQW units:
- Padding
- Margins
- Gaps
- Font sizes

```jsx
// ✅ CORRECT - all internal spacing uses CQW
<div
  className="flex flex-col"
  style={{
    gap: `${handout.paragraphGap}cqw`,
    padding: `${handout.padding}cqw`,
  }}
>
  <div style={{ fontSize: `${p.fontSize}cqw` }}>
    {/* Content */}
  </div>
</div>
```

## Implementation Checklist

When converting a component to use CQW units:

- [ ] Remove all `prose` classes from Markdown components
- [ ] Decide: Aspect ratio (inline-size) or natural flow (normal)?
- [ ] Use `cqw` for outer container width: `width: ${handout.pageWidth}cqw`
- [ ] Add responsive max-width classes: `xl:max-w-[24em] max-w-[20em]`
- [ ] Set up inner container query wrapper: `containerType: "inline-size"` or `"normal"`
- [ ] Convert ALL internal spacing to CQW units (margins, padding, gaps, font sizes)
- [ ] Update config: use **empty suffix** (`""`) for pageWidth, `"cqw"` for internal spacing
- [ ] Update font size ranges: 0.5-6 cqw (step 0.1) for body text
- [ ] Update default font sizes: ~1.4 cqw for body text
- [ ] Consider adding `maintainAspectRatio` boolean config for flexibility
- [ ] Test that width changes as you resize browser window

## Common Pitfalls

1. **Using `em` for outer width**: Component won't resize with viewport - use `cqw` instead!
2. **Adding suffix to pageWidth config**: Use empty suffix (`""`) and add `cqw` in component
3. **Leaving prose classes**: Causes layout conflicts with CQW scaling
4. **Mixed units**: Using some CQW and some fixed units breaks proportional scaling
5. **Wrong container placement**: Inner container query should be INSIDE outer width container
6. **Missing max-width constraint**: Need responsive classes like `xl:max-w-[24em] max-w-[20em]`
7. **Wrong font size ranges**: Using px ranges (8-48) instead of cqw ranges (0.5-6)
8. **Wrong containerType**: Using inline-size when you want natural flow, or normal when you want aspect ratio
9. **Handout not resizing**: Check that outer width uses `cqw` and parent `.render-area` has container query

## Complete Pattern Example

### Viewport-Responsive Pattern (Most Handouts)

**See: `NewspaperClipping.tsx`, `Polaroid.tsx`, `CharacterCard.tsx`**

```jsx
// Component - src/renderer/NewspaperClipping.tsx
export const NewspaperClipping = ({ handout }) => {
  const paperTint = hexToRgba(handout.paper.paperTint, 0.5);
  return (
    <div
      style={{
        backgroundColor: paperTint,
        backgroundBlendMode: "multiply",
        width: `${handout.dimensions.pageWidth}cqw`,  // ✅ cqw for viewport responsiveness!
        boxShadow: /* ... */,
      }}
      className="xl:max-w-[24em] max-w-[20em] paper transition paper-grey overflow-clip"  // ✅ Responsive max-width
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",  // ✅ Inner container query for nested CQW
        }}
      >
        <div
          style={{
            marginLeft: "12cqw",       // ✅ Internal spacing uses CQW
            marginRight: "12cqw",
            paddingLeft: "8cqw",
            paddingRight: "8cqw",
          }}
        >
          <div style={{ fontSize: `${handout.mainCopy.fontSize}cqw` }}>  {/* ✅ Font size in CQW */}
            <Markdown className="copy-markdown">  {/* ✅ No prose class */}
              {handout.mainCopy.content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

// Config - src/handoutConfigs.ts
export const NewspaperClippingConfig = {
  dimensions: {
    pageWidth: [60, range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" })],  // ✅ Empty suffix!
  },
  mainCopy: {
    fontSize: [4, range({ name: "Font Size", min: 1, max: 40, step: 0.1, suffix: "cqw" })],  // ✅ CQW suffix
  },
  // ...
} satisfies HandoutConfig;
```

### Configurable Flow Pattern (Letters)

**See: `PlainLetter.tsx`**

```jsx
// Component - src/renderer/PlainLetter.tsx
export const PlainLetter = ({ handout }) => {
  return (
    <div
      style={{
        width: `${handout.pageWidth}cqw`,  // ✅ Still uses cqw for responsiveness
        /* ... */
      }}
      className="paper max-w-[80em]"
    >
      <div
        className="w-full h-full"
        style={{
          containerType: handout.maintainAspectRatio ? "inline-size" : "normal",  // ✅ Configurable!
        }}
      >
        <div
          style={{
            gap: `${handout.paragraphGap}cqw`,
            padding: `${handout.padding}cqw`,
          }}
        >
          <div style={{ fontSize: `${p.fontSize}cqw` }}>
            <Markdown className="copy-markdown">{p.mainCopy}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

// Config
export const PlainLetterConfig = {
  pageWidth: [50, range({ name: "Page Width", min: 20, max: 80, suffix: "" })],  // ✅ Empty suffix
  maintainAspectRatio: [true, boolean({ name: "Maintain Aspect Ratio" })],
  padding: [6, range({ name: "Padding", min: 0, max: 20, suffix: "cqw" })],
  // ...
};
```

## Working Examples to Reference

### ✅ Fully Converted to CQW (Viewport-Responsive)
- **`NewspaperClipping.tsx`** - Aspect ratio mode, uses `cqw` for outer width
- **`Polaroid.tsx`** - Aspect ratio mode, configurable pin/paperclip with CQW
- **`PlainLetter.tsx`** - Configurable aspect ratio vs natural flow mode
- **`CharacterCard.tsx`** - Fixed aspect ratio card layout

### 🔧 Older Implementations (May use different patterns)
- **`Newspaper.tsx`** - Uses CQW but different config structure
- Other components may still be in transition

## Debug Tips

If content is appearing/disappearing or behaving unexpectedly:

1. **Component not resizing with browser**:
   - Check outer container uses `cqw`: `width: ${handout.pageWidth}cqw`
   - Verify config has empty suffix: `suffix: ""`
   - Check parent `.render-area` has `containerType: "inline-size"` in App.tsx

2. **Content sizes are wrong**:
   - Check for `prose` classes - remove them from Markdown components
   - Verify all internal spacing uses CQW: gaps, padding, margins, font sizes
   - Check font size ranges: should be 0.5-6 cqw, not 8-48 px

3. **Layout issues**:
   - Check `containerType`: "inline-size" for aspect ratio, "normal" for flow
   - Ensure responsive max-width classes: `xl:max-w-[24em] max-w-[20em]`
   - Verify inner container query is INSIDE outer width container

4. **Use browser dev tools**:
   - Inspect computed styles to see actual CQW pixel values
   - Check which container the CQW units are relative to
   - Verify container query is being detected

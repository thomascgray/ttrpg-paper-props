# CQW Relative Proportions - Implementation Guide

This document captures the learnings and patterns for implementing proper responsive scaling using Container Query Width (CQW) units in renderer components.

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
<div style={{ width: `${handout.pageWidth}em` }} className="max-w-[80em]">
  <div
    style={{ containerType: "inline-size" }}
    className="w-full h-full"
  >
    {/* Content with CQW font sizes - scales proportionally */}
  </div>
</div>
```

**Use when**: You want the entire handout to scale as one unit (newspapers, cards, signs, screens)

#### Mode 2: Natural Flow (For documents like letters)
Use `containerType: "normal"` - width is controlled but height flows with content.

```jsx
// ✅ CORRECT - Width controlled, height flows naturally
<div style={{ width: `${handout.pageWidth}em` }} className="max-w-[80em]">
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

### 3. Width Units: Use `em` NOT `cqw` for Main Container

**CRITICAL LEARNING**: The outer container width should use `em` units, NOT `cqw`.

```jsx
// ❌ WRONG - using cqw for outer width creates circular dependencies
<div style={{ width: `${handout.pageWidth}cqw` }}>

// ✅ CORRECT - use em for outer width, cqw for internal spacing
<div style={{ width: `${handout.pageWidth}em` }} className="max-w-[80em]">
```

**Why**:
- `cqw` on the outer container creates a circular dependency (container queries itself)
- `em` gives direct, predictable control over actual width
- `max-w-[XXem]` provides an upper bound
- Internal elements use `cqw` for proportional scaling relative to the fixed width

### 4. Config Structure

```javascript
// ✅ CORRECT config structure for width
pageWidth: [50, range({ name: "Page Width", min: 20, max: 80, suffix: "em" })],

// ✅ CORRECT - empty suffix for proportional values used with cqw
dimensions: {
  pageWidth: [45, range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" })],
  pageHeight: [110, range({ name: "Page Height", min: 20, max: 200, step: 1, suffix: "" })],
}

// ✅ CORRECT - cqw suffix for internal spacing
padding: [6, range({ name: "Padding", min: 0, max: 20, suffix: "cqw" })],
fontSize: [1.4, range({ name: "Font Size", min: 0.5, max: 6, step: 0.1, suffix: "cqw" })],
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
- [ ] Use `em` for outer container width (NOT cqw)
- [ ] Add `max-w-[XXem]` class to outer container
- [ ] Set up container query on wrapper div: `containerType: "inline-size"` or `"normal"`
- [ ] Convert ALL internal spacing to CQW units (margins, padding, gaps, font sizes)
- [ ] Update config: use `em` suffix for pageWidth, `cqw` for internal spacing
- [ ] Update font size ranges: 0.5-6 cqw (step 0.1) for body text
- [ ] Update default font sizes: ~1.4 cqw for body text
- [ ] Consider adding `maintainAspectRatio` boolean config for flexibility
- [ ] Test that width changes work correctly in both modes

## Common Pitfalls

1. **Using cqw for outer width**: Creates circular dependencies - use `em` instead
2. **Leaving prose classes**: Causes layout conflicts with CQW scaling
3. **Mixed units**: Using some CQW and some fixed units breaks proportional scaling
4. **Wrong container placement**: Container queries on main parent instead of wrapper
5. **Missing max-width constraint**: Need `max-w-[XXem]` for upper bound
6. **Wrong font size ranges**: Using px ranges (8-48) instead of cqw ranges (0.5-6)
7. **Wrong containerType**: Using inline-size when you want natural flow, or normal when you want aspect ratio

## Complete Pattern Example

### Natural Flow Pattern (Letters, Documents)
```jsx
// Component
export const PlainLetter = ({ handout }) => {
  return (
    <div
      style={{
        width: `${handout.pageWidth}em`,  // ✅ em for outer width
        padding: /* outer styling */,
      }}
      className="paper max-w-[80em]"  // ✅ max-width constraint
    >
      <div
        className="w-full h-full"
        style={{
          containerType: handout.maintainAspectRatio ? "inline-size" : "normal",  // ✅ Configurable
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: `${handout.paragraphGap}cqw`,      // ✅ cqw for internal spacing
            padding: `${handout.padding}cqw`,        // ✅ cqw for internal spacing
          }}
        >
          <div style={{ fontSize: `${p.fontSize}cqw` }}>  {/* ✅ cqw for fonts */}
            <Markdown className="copy-markdown">  {/* ✅ No prose class */}
              {content}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

// Config
export const PlainLetterConfig = {
  pageWidth: [50, range({ name: "Page Width", min: 20, max: 80, suffix: "em" })],  // ✅ em
  maintainAspectRatio: [true, boolean({ name: "Maintain Aspect Ratio" })],         // ✅ Toggle
  padding: [6, range({ name: "Padding", min: 0, max: 20, suffix: "cqw" })],       // ✅ cqw
  paragraph: [
    [{
      fontSize: 1.4,  // ✅ Default in cqw range
      // ...
    }],
    paragraphArray({ name: "Paragraphs" }),
  ],
  paragraphGap: [0, range({ name: "Paragraph Gap", min: 0, max: 10, suffix: "cqw" })],  // ✅ cqw
};

// ParagraphArray component
<RangeInput
  label="Font Size"
  min={0.5}      // ✅ cqw range
  max={6}        // ✅ cqw range
  step={0.1}
  suffix="cqw"
/>
```

### Aspect Ratio Pattern (Cards, Signs)
```jsx
// Same as above, but:
containerType: "inline-size"  // Always maintains aspect ratio
// And typically dimensions use empty suffix for proportional values
dimensions: {
  pageWidth: [35, range({ name: "Page Width", min: 20, max: 60, suffix: "" })],
  pageHeight: [50, range({ name: "Page Height", min: 30, max: 80, suffix: "" })],
}
```

## Working Examples

- **Newspaper**: Uses CQW with containerType: inline-size for aspect ratio
- **NewspaperClipping**: Both width/height in CQW with inline-size
- **CharacterCard**: Fixed aspect ratio with inline-size
- **PlainLetter**: Uses em for width, configurable containerType for flow control

## Debug Tips

If content is appearing/disappearing or behaving unexpectedly:

1. **Check outer container width unit**: Should be `em` not `cqw`
2. **Check for prose classes**: Remove them from Markdown components
3. **Check containerType**: Use "inline-size" for aspect ratio, "normal" for flow
4. **Verify all internal spacing uses CQW**: Gaps, padding, margins, font sizes
5. **Check font size ranges**: Should be 0.5-6 cqw, not 8-48 px
6. **Ensure max-w constraint**: Need `max-w-[XXem]` on outer container
7. **Test with browser dev tools**: See which elements are changing unexpectedly

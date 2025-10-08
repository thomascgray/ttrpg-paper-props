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

### 2. Container Query Setup
Container queries should be set up on a **wrapper div**, not the main parent, and should be max width/height.

```jsx
// ✅ CORRECT pattern
<div className="main-component" style={{ width: `${handout.dimensions.pageWidth}cqw` }}>
  <div 
    style={{ containerType: "inline-size" }}
    className="w-full h-full"
  >
    {/* Content with CQW font sizes goes here */}
  </div>
</div>
```

### 3. Use CQW for ALL Styling
For consistent scaling, **everything** should use CQW units:
- Dimensions (width, height)
- Margins and padding
- Font sizes
- Any spacing values

```jsx
// ✅ CORRECT - all spacing uses CQW
<div 
  style={{
    width: `${handout.dimensions.pageWidth}cqw`,
    height: `${handout.dimensions.pageHeight}cqw`,
    marginLeft: "12cqw",
    marginRight: "12cqw", 
    paddingLeft: "8cqw",
    paddingRight: "8cqw",
  }}
>
  <div style={{ fontSize: `${handout.fontSize}cqw` }}>
    {/* Content */}
  </div>
</div>
```

### 4. Both Width AND Height Can Work
Contrary to initial assumptions, both width and height in CQW work fine when:
- Proper container setup is used
- Prose classes are removed
- All spacing uses consistent CQW units

```jsx
// ✅ CORRECT - both dimensions in CQW
style={{
  width: `${handout.dimensions.pageWidth}cqw`,
  height: `${handout.dimensions.pageHeight}cqw`,
}}
```

### 5. Config Values as Proportions
Config values represent proportional relationships, not literal CQW values (hence no suffix).

```javascript
// ✅ CORRECT config structure
dimensions: {
  pageWidth: [45, range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" })],
  pageHeight: [110, range({ name: "Page Height", min: 20, max: 200, step: 1, suffix: "" })],
}
```

### 6. Nested Container Contexts
Multiple container query layers enable different scaling contexts for different elements.

```jsx
// ✅ CORRECT - nested containers for different contexts
<div style={{ containerType: "inline-size" }} className="w-full h-full">
  <div className="content-wrapper">
    <div style={{ containerType: "inline-size" }} className="w-full h-full">
      {/* Font-specific scaling context */}
    </div>
  </div>
</div>
```

## Implementation Checklist

When converting a component to use CQW units:

- [ ] Remove all `prose` classes from Markdown components
- [ ] Set up container query on wrapper div (not main parent)
- [ ] Convert ALL spacing to CQW units (margins, padding, font sizes)
- [ ] Use config values without CQW suffix (they represent proportions)
- [ ] Test that content scales consistently without appearing/disappearing
- [ ] Verify font sizes scale properly with container context
- [ ] Ensure nested containers for complex scaling scenarios

## Common Pitfalls

1. **Leaving prose classes**: Causes layout conflicts with CQW scaling
2. **Mixed units**: Using some CQW and some fixed units breaks proportional scaling  
3. **Wrong container placement**: Container queries on main parent instead of wrapper
4. **Missing container context**: Font sizes need proper containerType parent
5. **Assuming width-only**: Both width and height can work with proper setup

## Working Examples

- **Newspaper**: Uses CQW with nested container for text scaling
- **NewspaperClipping**: Both width/height in CQW with nested containers and no prose classes

## Debug Tips

If content is appearing/disappearing with browser width changes:
1. Check for prose classes and remove them
2. Verify all spacing uses CQW units consistently  
3. Ensure container query is on wrapper, not main parent
4. Test with browser dev tools to see which elements are changing unexpectedly
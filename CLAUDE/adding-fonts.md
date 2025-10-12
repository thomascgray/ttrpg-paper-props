# Adding New Fonts

This guide explains how to add new fonts to the application so they appear in font picker dropdowns.

## Prerequisites

Font files should be added to `public/fonts/` directory (typically `.ttf` files).

## Steps to Wire Up New Fonts

### 1. Add @font-face declarations to `public/fonts/fonts.css`

Add a `@font-face` block for each font file at the end of the file:

```css
@font-face {
  font-family: "Font Display Name";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/FontFileName-Regular.ttf") format("truetype");
}
```

**Notes:**
- Use the proper font display name (as it appears in the font metadata)
- Include all variants if the font has multiple weights/styles (regular, italic, bold, etc.)
- Keep fonts alphabetically ordered in the file

### 2. Add enum entries to `src/enums.ts`

Add new entries to the `FontFamily` enum in the appropriate category (Serif, Sans Serif, Cursive/Handwriting, or Fantasy):

```typescript
export enum FontFamily {
  // ... existing fonts ...

  // Cursive/Handwriting fonts (or appropriate category)
  FONT_NAME = "font-font-name",  // Use kebab-case for CSS class
  // ... more fonts ...
}
```

**Notes:**
- The enum value should be a CSS class name in kebab-case format
- Keep fonts organized within their category comments

### 3. Add CSS classes to `src/index.css`

Add CSS class definitions after the existing font classes:

```css
.font-font-name {
  font-family: "Font Display Name", cursive;
}
```

**Notes:**
- The class name must match the enum value from step 2
- Use the same font display name from step 1
- Include appropriate fallback font family (cursive, serif, sans-serif, fantasy)
- Keep fonts grouped together in the CSS file

### 4. Add options to `src/components/FontSelector.tsx`

Add `<option>` elements to the appropriate `<optgroup>` in the FontSelector component:

```tsx
<optgroup className="font-sans" label="Cursive/Handwriting">
  {/* ... existing options ... */}

  <option className="font-font-name" value="font-font-name">
    Font Display Name
  </option>
</optgroup>
```

**Notes:**
- Both `className` and `value` should match the CSS class/enum value
- The display text is what users see in the dropdown
- Add to the correct optgroup: Serif, Sans Serif, Cursive/Handwriting, or Fantasy
- Keep options in a logical order (alphabetical or by visual similarity)

## Example: Adding "Schoolbell" Font

### 1. fonts.css
```css
@font-face {
  font-family: "Schoolbell";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/Schoolbell-Regular.ttf") format("truetype");
}
```

### 2. enums.ts
```typescript
// Cursive/Handwriting fonts
SCHOOLBELL = "font-schoolbell",
```

### 3. index.css
```css
.font-schoolbell {
  font-family: "Schoolbell", cursive;
}
```

### 4. FontSelector.tsx
```tsx
<option className="font-schoolbell" value="font-schoolbell">
  Schoolbell
</option>
```

## Testing

After adding fonts:
1. Check that the font appears in the font picker dropdown
2. Select the font and verify it renders correctly in the preview
3. Test with different handout types that use font pickers
4. Export a handout to ensure the font is included in exports

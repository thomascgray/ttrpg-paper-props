# Claude Memory - TTRPG Paper Props

## Converting Old-Style Configs to New-Style Configs

### Overview
The project is migrating from an old config structure (in `src/config.ts`) to a new database-backed structure (in `src/db.ts`). Here's how to convert components from the old style to the new style.

### Key Differences

#### Old Style (config.ts)
- Properties are nested objects with `value` fields
- Uses snake_case naming (e.g., `paper_tint`, `font_size`)
- Access pattern: `handout.paper_tint.value`
- Type: `(typeof CONFIG_NAME)["data"]`

#### New Style (db.ts)
- Uses tuple format: `[defaultValue, configObject]`
- Uses camelCase naming (e.g., `paperTint`, `fontSize`)
- After `ExtractConfigValues`, access properties directly without `.value`
- Type: `ExtractConfigValues<typeof ConfigName>`

### Conversion Steps

1. **Update imports**:
   ```typescript
   // Old
   import { CONFIG_NAME } from "../config";
   
   // New
   import { ConfigName, ExtractConfigValues } from "../db";
   ```

2. **Create type alias**:
   ```typescript
   // Old
   handout: (typeof CONFIG_NAME)["data"];
   
   // New
   type ComponentData = ExtractConfigValues<typeof ConfigName>;
   handout: ComponentData;
   ```

3. **Update property access**:
   - Remove all `.value` suffixes
   - Convert snake_case to camelCase
   - Update nested properties (especially positioning)

### Common Property Mappings

| Old Style | New Style |
|-----------|-----------|
| `handout.paper_tint.value` | `handout.paperTint` |
| `handout.page_width.value` | `handout.pageWidth` |
| `handout.is_paper_shadow.value` | `handout.isPaperShadow` |
| `handout.positioning.x_offset.value` | `handout.positioning.xOffset` |
| `handout.positioning.y_offset.value` | `handout.positioning.yOffset` |
| `handout.positioning.rotation_degrees.value` | `handout.positioning.rotationDegrees` |
| `handout.ink_color.value` | `handout.inkColor` |
| `handout.paper_texture.value` | `handout.paperTexture` |
| `handout.paragraph_gap.value` | `handout.paragraphGap` |

### Array Properties (e.g., paragraphs)
For array properties like paragraphs:
- Old: `p.font_size.value`, `p.text_align.value`, `p.main_copy.value`
- New: `p.fontSize`, `p.textAlign`, `p.mainCopy`

### Example Components Already Converted
- `CharacterCard` - src/renderer/CharacterCard.tsx
- `PlainLetter` - src/renderer/PlainLetter.tsx

### Remaining Components to Convert
- Newspaper
- NewspaperClipping
- BookCover
- LabelledLiquid
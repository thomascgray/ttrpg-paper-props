# Tree trunk carving

## Summary

A photo of a tree trunk with text carved into the bark. Think initials in a heart, a warning knifed into a waymarker tree, or a tally of days. It's a copy of the Gravestone handout with wood-specific carve styles, so most of the work is sourcing photos and tuning the CSS.

## Reference implementation

- `src/renderer/Gravestone.tsx`: image template, per-image text area, two stacked carve layers (highlight with screen, text with multiply).
- `GRAVESTONE_IMAGES` and `GravestoneConfig` in `src/handoutConfigs.ts`: the per-image text-area map and the config to copy.
- `.carved-stone-*` and `.rough-edges-subtle` in `src/index.css`.
- `src/renderer/Rectangle1WoodenSign.tsx`: the older `.engraved-text` wood look. It's a single layer, so don't copy it.
- `CLAUDE/add-new-handout-type.md` for wiring. `CLAUDE/cqw-relative-proportions.md` for sizing.

## Assets

- No trunk photos exist yet. Source 4 to 6 into `public/images/tree_trunks/` as `.avif`, cropped tight to the trunk, with a flat-ish bark face in the middle third.
- Aim for a mix: smooth beech (the classic carving tree), rough oak, birch, a dead grey trunk, and one mossy trunk.
- Lighting should be even. Strong side light fights the carve shadows.

## Requirements

1. New handout `TreeTrunk`, display name "Carved Tree Trunk", type `"object"`, route `/tree-trunk` with alias `/tree`.
2. `TREE_TRUNK_IMAGES` map in `handoutConfigs.ts` with the same shape as `GRAVESTONE_IMAGES` (`label`, `top`, `left`, `width` as % of the image). Add a one-line comment on any entry whose text area is unusual, matching the gravestone entries.
3. Config fields:
   - `...positioning`
   - `pageWidth` (range 10 to 100, default 35, empty suffix)
   - `trunkImage` (select over `TREE_TRUNK_IMAGES`)
   - `sections` (`paragraphArray`, same as gravestone)
   - `sectionGap`
   - `textYOffset`
   - `textRotation` (range -30 to 30, suffix °). Carvings are rarely level.
   - `carveStyle` (select: `fresh`, `aged`, `scorched`)
   - `carveDepth` (0.1 to 1)
   - `weathered` (boolean, default true)
   - `...imageOpts`
4. Default sections: a hand-carved heart-and-initials look, e.g. "T.G. + M.R." then "1847". Use `FontFamily.MANSALVA` or `LACQUER`. Knife carving is not serif lettering.
5. Renderer copies the Gravestone two-layer structure: an image, then a highlight layer, then a carve layer, both absolutely positioned at the selected text area, with `--carve-depth` set inline.
6. `carveStyle` maps to a CSS class on both layers:
   - `fresh`: pale inner wood showing. The carve layer is a light tan (roughly `rgb(222 196 150)`) with no multiply, and the shadow sits on the top inner edge. Fresh cuts are lighter than bark, the opposite of stone.
   - `aged`: the healed, darkened scar. It uses multiply like `.carved-stone-text`, but with a warmer brown.
   - `scorched`: a burned-in look. Near-black with a faint orange-brown outer glow, no highlight layer.
7. New CSS lives next to `.carved-stone-*` in `src/index.css`, with a comment block explaining the three styles the way the stone block does. Shadow offsets are in `em`.
8. `weathered` applies `rough-edges` (the stronger filter), not `rough-edges-subtle`. Knife cuts in bark are ragged.
9. `textRotation` rotates the text wrapper around its centre. It doesn't move the text area.
10. Export works. Check that the filters survive via `injectGlobalSvgFilters` in `src/ExportImageButton.tsx`.
11. Add an example screenshot at `public/handout_examples/tree-trunk.png`.

## Out of scope

- Wrapping the text around the trunk's curve. A displacement map could fake it, but flat text on a tight crop reads fine. Revisit if it looks wrong.
- Carved shapes such as a heart outline or an arrow. For now, a heart glyph (♥) in a section covers it.

## Open questions

- Should `carveStyle` be per section (fresh initials next to an aged older carving)? That would be a nice story beat, but it needs a custom array input. I'd start global.

# Chalkboard

## Summary

A black slate chalkboard with white chalk text and an optional wooden frame. It covers tavern menus, a pub's daily specials, a bounty board in a guild hall, or a schoolroom slate. It's pure HTML, CSS and an SVG filter, with no photos. The chalk text breaks up in random patches, so some strokes look worn away.

## Reference implementation

- `src/renderer/PlainLetter.tsx`: width plus `paragraphArray` sections on a CSS surface.
- `RoughEdgesFilterDeclaration` in `src/main.tsx`: the existing global SVG filter pattern.
- `injectGlobalSvgFilters` in `src/ExportImageButton.tsx`: the reason filters declared outside the captured node still export.
- `CLAUDE/adding-fonts.md` if a chalk font is added.

## How the chalk fade works

The renderer declares its own SVG `<filter>` inline, inside the captured node, so props can drive its attributes. Filter attributes can't read CSS variables. The filter chain:

1. A fine `feTurbulence` (high `baseFrequency`, around 0.8) gives the chalk grain, which is small speckled gaps in every stroke.
2. A coarse `feTurbulence` (low `baseFrequency`, around 0.015) gives large patches where the chalk is rubbed off.
3. `feColorMatrix` turns each noise into an alpha mask. `feComponentTransfer` with a threshold sets how much is removed, driven by the `fadeAmount` and `grainAmount` props.
4. `feComposite operator="in"` keeps the `SourceGraphic` text only where both masks allow it.
5. The `seed` attribute on both turbulences is a prop, so the user can reroll the pattern.

Give the filter id a per-instance suffix (`useId()`) so two boards on screen don't collide.

## Requirements

1. New handout `Chalkboard`, display name "Chalkboard", type `"object"`, route `/chalkboard`.
2. Config fields:
   - `...positioning`
   - `pageWidth` (range 20 to 100, default 50)
   - `aspectRatio` (select: Landscape 4:3, Wide 16:9, Portrait 3:4, Square)
   - `boardColour` (`colour`, default near-black green-grey, roughly `#1f2421`)
   - `frame` (select: None, Light wood, Dark wood)
   - `frameWidth` (range in cqw, hidden or ignored when frame is None)
   - `chalkColour` (`colour`, default `#FFFFFF`)
   - `textRotation` (range -45 to 45, suffix °), rotates all the text together
   - `paragraph` (`paragraphArray` with `showRotation: true`, so each paragraph has its own rotation slider)
   - `paragraphGap`
   - `padding`
   - `fadeAmount` (0 to 1, default 0.35)
   - `grainAmount` (0 to 1, default 0.5)
   - `fadeSeed` (range 1 to 100, step 1)
   - `smudges` (boolean, default true)
   - `ghostText` (textArea, default empty)
3. The board is a fixed-aspect box (`aspect-ratio` CSS) of `pageWidth` cqw, with `containerType: inline-size` inside, so text scales with the board. Text overflow is clipped, not grown.
4. The board surface is `boardColour`, plus a low-opacity full-board `feTurbulence` noise layer so it isn't a flat fill.
5. `smudges` adds two or three large, very low-opacity white radial gradients (eraser swipes). Their positions come from `fadeSeed`, so they're stable between renders.
6. `frame` is a CSS border built from layered linear gradients for wood grain, with an inner bevel shadow. No image. A Light wood option and a Dark wood option.
7. The chalk filter (described above) applies to the text wrapper only, never to the board or frame.
8. `ghostText` renders behind the main text, blurred about 0.06em, at about 8% opacity, through the same fade filter. It's half-erased old writing. It's cheap to build and sells the effect.
9. Text uses `chalkColour` directly, not `inkSelector`. Ink classes are for paper.
10. Default content is a tavern specials board: "The Drowned Rat", "~ Today ~", then a price list. All default text, and new paragraphs, use `ZEYADA`.
11. Add one chalk font per `CLAUDE/adding-fonts.md` (Fredericka the Great, OFL). It is in the font picker but not used by default.
12. Export check: the inline filter is inside the captured node, so it should survive `html-to-image` without injection. Verify the exported PNG shows the fade, not clean text.
13. Add an example screenshot at `public/handout_examples/chalkboard.png`.

## Risks

- SVG filters on large text areas are slow in Firefox. If slider dragging lags, debounce the filter props or apply the filter at a lower `filterRes`.
- The threshold maths in `feComponentTransfer` needs tuning by eye. Expect a round of fiddling with the `tableValues`.

## Out of scope

- An A-frame pavement sign variant. That needs a photo, and it's a separate handout.
- Chalk drawings (arrows, underlines) beyond what markdown and glyphs give.

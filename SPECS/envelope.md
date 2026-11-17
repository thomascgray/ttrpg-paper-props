# Envelope

## Summary

A paper envelope, shown front (address side) or back (flap and wax seal). It pairs with `PlainLetter`: hand players the envelope first, then the letter. The envelope itself is HTML and CSS on the existing paper textures. The wax seal is the one part that needs photos.

## Why no envelope photos

- The paper textures (`.paper-*` classes, `paperTexture()`, `paperTint`) already give a convincing paper surface.
- The back flaps are three or four triangles. Each one is a `clip-path: polygon(...)` div with the same texture, plus a gradient along the fold edge for the crease shadow and a `drop-shadow` filter for the overlap.
- The front is a plain rectangle with address text, which is `PlainLetter` with less text.
- A CSS envelope can change size, aspect, colour and texture freely. A photo can't.

## Why the wax seal needs photos

CSS radial gradients make wax look like plastic. Real wax has an irregular rim, a glossy pooled edge and a pressed relief. Source 3 or 4 seal photos with transparent backgrounds and a mostly blank centre into `public/images/wax_seals/`. Recolour them with the existing `imageOpts` hue rotation, and carve a user-chosen letter or glyph into the centre with the gravestone's two-layer carve CSS.

## Reference implementation

- `src/renderer/PlainLetter.tsx`: paper texture, tint, inset shadow, `paragraphArray`.
- `src/renderer/Gravestone.tsx` and `.carved-stone-*` in `src/index.css`: the pressed-relief look for the seal's centre glyph.
- `GRAVESTONE_IMAGES`: the per-image map pattern, reused for seal images (centre point and glyph size).

## Requirements

1. New handout `Envelope`, display name "Envelope", type `"digital_paper"`, route `/envelope`.
2. Config fields:
   - `...positioning`
   - `pageWidth` (default 45)
   - `aspectRatio` (select: Letter 3:2, Long 9:4, Square, Card 4:3)
   - `side` (select: Front, Back)
   - `paperTexture`
   - `paperTint`
   - `isPaperShadow`
   - `inkColor`
   - `flapStyle` (select: Pointed, Rounded, Straight)
   - `isOpened` (boolean, default false)
   - `addressLines` (`paragraphArray`)
   - `returnAddress` (textArea, default empty)
   - `postmark` (text, default empty)
   - `seal` (group: `showSeal`, `sealImage`, `sealGlyph`, `sealGlyphFont`, `sealSize`, `sealYOffset`, plus a hue rotation reusing `imageOpts`)
3. Front: a textured rectangle with `addressLines` centred slightly below the middle. `returnAddress`, if set, sits small in the top left. `postmark`, if set, renders as a circular ink stamp in the top right: a CSS circle border, curved text optional, rotated about -12°, at about 60% opacity. Blend mode is multiply.
4. Back: four `clip-path` triangles (bottom, left, right, top flap) over the base rectangle, each with the same `paper paper-${texture}` class and tint. The top flap sits last and casts a `drop-shadow`. Each fold edge has a thin gradient line for the crease.
5. `flapStyle` changes only the top flap's polygon. Rounded uses `clip-path: path(...)` or an ellipse.
6. `isOpened` (back only) flips the top flap up with `rotateX(180deg)` from the top edge, shows the inside of the flap slightly darker, and replaces the seal with the cracked half. Without a cracked-seal photo, the fallback is to hide the seal.
7. The seal sits at the top flap's point. `sealGlyph` (1 or 2 characters, default "R") renders through the two carve layers so it looks pressed into the wax. Seal hue comes from hue rotation on the image. The default seal colour is red.
8. Text uses `inkColor` classes like `PlainLetter`.
9. Default content: front reads "To the Honourable Magistrate Vell", "Tower Ward, Doskvol", postmark "CHARHOLLOW". Back shows a red seal with "V".
10. Export check: clip-paths, drop-shadows and the carve blend modes all survive `html-to-image`.
11. Add an example screenshot at `public/handout_examples/envelope.png`.

## Out of scope

- A postage stamp image slot. It's easy to add later as an `imageInput` with a perforated CSS edge (radial-gradient mask), but most fantasy settings predate stamps.
- Showing the letter sliding out of the opened envelope. That's a composition of two handouts, and the app renders one at a time.

## Open questions

- Should `isOpened` exist at all in the first pass? It's the fiddliest requirement. I'd ship closed-only first.

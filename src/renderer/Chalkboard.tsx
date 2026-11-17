import { useMemo } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { ChalkboardConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba } from "../utils";

type ChalkboardData = ExtractConfigValues<typeof ChalkboardConfig>;

/*
  All noise here is drawn as one SVG image stretched over the whole board,
  never as a repeating tile or a live CSS filter on the text. Tiled noise
  showed seams every 400px, and Chrome renders feTurbulence in CSS filters
  in chunks, which cut hard edges through the text.

  The SVG viewBox matches the board's aspect ratio so the noise isn't
  stretched, and noise frequencies are in viewBox units (board width =
  NOISE_WIDTH), so the grain scales with the board instead of the screen.
*/
const NOISE_WIDTH = 1000;

const svgUrl = (width: number, height: number, body: string) =>
  `url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">${body}</svg>`
  )}")`;

// "4 / 3" -> 0.75
const heightRatio = (aspectRatio: string) => {
  const [w, h] = aspectRatio.split("/").map((n) => parseFloat(n));
  return w && h ? h / w : 0.75;
};

// Pale specks plus large soft mottling, so the slate isn't a flat fill
const slateNoise = (height: number) =>
  svgUrl(
    NOISE_WIDTH,
    height,
    `<filter id="m" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.004" numOctaves="2"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.09 0 0 0 0"/>
    </filter>
    <filter id="f" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.12 0 0 0 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#m)"/>
    <rect width="100%" height="100%" filter="url(#f)"/>`
  );

// Noise stretched horizontally reads as wood grain
const WOOD_GRAIN = svgUrl(
  600,
  300,
  `<filter id="g" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.003 0.2" numOctaves="4"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.55 0 0 0 0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#g)"/>`
);

/*
  Alpha mask for the chalk text. Each noise layer becomes alpha via
  alpha = slope * (noise - threshold) + 1, so noise above the threshold keeps
  the chalk and noise below it fades. fractalNoise mostly sits between 0.3
  and 0.7.
  - Grain: fine, sharp speckled gaps inside every stroke.
  - Patches: large, soft rubbed areas. They never go below `patchFloor`, so a
    worn patch dims a word without deleting it.
*/
const chalkMask = (
  height: number,
  fadeAmount: number,
  grainAmount: number,
  seed: number
) => {
  const grainSlope = 12;
  const grainThreshold = 0.25 + grainAmount * 0.25;
  const patchSlope = 6;
  const patchThreshold = 0.35 + fadeAmount * 0.2;
  const patchFloor = 1 - fadeAmount * 0.7;

  return svgUrl(
    NOISE_WIDTH,
    height,
    `<filter id="c" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="2" seed="${seed}" result="gn"/>
      <feColorMatrix in="gn" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="gr"/>
      <feComponentTransfer in="gr" result="grain">
        <feFuncA type="linear" slope="${grainSlope}" intercept="${1 - grainSlope * grainThreshold}"/>
      </feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="3" seed="${seed + 1}" result="pn"/>
      <feColorMatrix in="pn" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="pr"/>
      <feComponentTransfer in="pr" result="pc">
        <feFuncA type="linear" slope="${patchSlope}" intercept="${1 - patchSlope * patchThreshold}"/>
      </feComponentTransfer>
      <feComponentTransfer in="pc" result="patch">
        <feFuncA type="linear" slope="${1 - patchFloor}" intercept="${patchFloor}"/>
      </feComponentTransfer>
      <feComposite in="grain" in2="patch" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    </filter>
    <rect width="100%" height="100%" fill="white" filter="url(#c)"/>`
  );
};

const FRAME_COLOURS: Record<string, string> = {
  "light-wood": "#9a6b3c",
  "dark-wood": "#4a2c18",
};

// Seeded so smudges stay put between renders and match the fade pattern seed
const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const smudgeGradients = (seed: number) => {
  const rand = mulberry32(seed * 9973);
  const swipes = Array.from({ length: 3 }, () => {
    const x = 15 + rand() * 70;
    const y = 15 + rand() * 70;
    const w = 25 + rand() * 25;
    const h = 8 + rand() * 12;
    const alpha = 0.04 + rand() * 0.04;
    return `radial-gradient(ellipse ${w}% ${h}% at ${x}% ${y}%, rgb(255 255 255 / ${alpha}), transparent 70%)`;
  });
  // Chalk dust settles along the bottom edge
  swipes.push(
    "linear-gradient(to top, rgb(255 255 255 / 0.06), transparent 10%)"
  );
  return swipes;
};

const maskStyle = (mask: string): React.CSSProperties => ({
  maskImage: mask,
  WebkitMaskImage: mask,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
});

export const Chalkboard = ({ handout }: { handout: ChalkboardData }) => {
  const hasFrame = handout.frame !== "none";
  const ghostFont = handout.paragraph[0]?.font ?? "font-schoolbell";
  const noiseHeight = Math.round(
    NOISE_WIDTH * heightRatio(handout.aspectRatio)
  );

  const mask = useMemo(
    () =>
      chalkMask(
        noiseHeight,
        handout.fadeAmount,
        handout.grainAmount,
        handout.fadeSeed
      ),
    [noiseHeight, handout.fadeAmount, handout.grainAmount, handout.fadeSeed]
  );

  const boardBackground = useMemo(
    () =>
      [
        slateNoise(noiseHeight),
        ...(handout.smudges ? smudgeGradients(handout.fadeSeed) : []),
      ].join(", "),
    [noiseHeight, handout.smudges, handout.fadeSeed]
  );

  return (
    <div
      className="relative max-w-[80em]"
      style={{ width: `${handout.pageWidth}cqw` }}
    >
      <div className="w-full" style={{ containerType: "inline-size" }}>
        <div
          className="w-full"
          style={{
            aspectRatio: handout.aspectRatio,
            padding: hasFrame ? `${handout.frameWidth}cqw` : 0,
            backgroundColor: FRAME_COLOURS[handout.frame],
            backgroundImage: hasFrame ? WOOD_GRAIN : undefined,
            backgroundSize: "100% 100%",
            borderRadius: hasFrame ? "0.6cqw" : 0,
            boxShadow: hasFrame
              ? `inset 0.3cqw 0.3cqw 0.4cqw rgb(255 255 255 / 0.18),
                 inset -0.3cqw -0.3cqw 0.5cqw rgb(0 0 0 / 0.45),
                 0 1cqw 2.5cqw rgb(0 0 0 / 0.5)`
              : "0 1cqw 2.5cqw rgb(0 0 0 / 0.5)",
          }}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              backgroundColor: handout.boardColour,
              backgroundImage: boardBackground,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              boxShadow: hasFrame
                ? "inset 0 0 1.5cqw rgb(0 0 0 / 0.7)"
                : "inset 0 0 0.6cqw rgb(0 0 0 / 0.5)",
            }}
          >
            {handout.ghostText.trim() && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  padding: `${handout.padding}cqw`,
                  color: hexToRgba(handout.chalkColour, 0.09),
                  filter: "blur(0.25cqw)",
                  transform: "rotate(-4deg)",
                }}
              >
                <Markdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  className={`${ghostFont} copy-markdown text-center`}
                >
                  {handout.ghostText}
                </Markdown>
              </div>
            )}

            <div
              className="relative flex flex-col justify-center w-full h-full"
              style={{
                gap: `${handout.paragraphGap}cqw`,
                padding: `${handout.padding}cqw`,
                color: handout.chalkColour,
                // A soft halo of the chalk colour reads as dust around strokes
                textShadow: `0 0 0.08em ${hexToRgba(handout.chalkColour, 0.45)}`,
                transform: `rotate(${handout.textRotation}deg)`,
                ...maskStyle(mask),
              }}
            >
              {handout.paragraph.map((p) => (
                <div
                  key={p.id}
                  className="w-full"
                  style={{
                    fontSize: `${p.fontSize}cqw`,
                    lineHeight: 1.2,
                    // Rows saved before rotation existed have no value
                    transform: `rotate(${p.rotation ?? 0}deg)`,
                  }}
                >
                  <Markdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    className={`block ${p.textAlign} ${p.font} ${p.fontWeight} copy-markdown list-inside list-disc w-full`}
                  >
                    {p.mainCopy}
                  </Markdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

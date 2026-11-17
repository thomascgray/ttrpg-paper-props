import { useEffect, useId, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import classNames from "classnames";
import { EnvelopeConfig, WAX_SEAL_IMAGES } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { getImageProcessingStyles, hexToRgba } from "../utils";
import { Postmark, postmarkAspect } from "./EnvelopePostmark";

type EnvelopeData = ExtractConfigValues<typeof EnvelopeConfig>;

// How far down the envelope (% of height) the top flap reaches. The seal sits
// on this point.
const TOP_FLAP_DEPTH: Record<string, number> = {
  pointed: 58,
  rounded: 54,
  straight: 36,
};

// Percentages in clip-path polygons are relative to the envelope box, so the
// flaps stretch with the aspect ratio. clip-path: path() only takes px.
const topFlapClipPath = (flapStyle: string, depth: number) => {
  if (flapStyle === "straight") {
    return `polygon(0 0, 100% 0, 100% ${depth}%, 0 ${depth}%)`;
  }
  if (flapStyle === "rounded") {
    // A parabola: flat-ish sides that round off at the tip
    const points = Array.from({ length: 33 }, (_, i) => {
      const u = (i / 32) * 2 - 1;
      return `${(i / 32) * 100}% ${depth * (1 - u * u)}%`;
    });
    return `polygon(${points.join(", ")})`;
  }
  return `polygon(0 0, 100% 0, 50% ${depth}%)`;
};

const BOTTOM_FLAP = "polygon(0 100%, 50% 42%, 100% 100%)";
const LEFT_FLAP = "polygon(0 0, 45% 55%, 0 100%)";
const RIGHT_FLAP = "polygon(100% 0, 55% 55%, 100% 100%)";

const paperBackground = (handout: EnvelopeData): React.CSSProperties => ({
  backgroundColor: hexToRgba(handout.paperTint, 0.5),
  backgroundBlendMode: "multiply",
});

// One folded flap: the wrapper carries the drop-shadow, because a filter on
// the clipped element itself would be clipped away with it
const Flap = ({
  handout,
  clipPath,
  crease,
  shadow,
  shade = 0,
  style,
}: {
  handout: EnvelopeData;
  clipPath: string;
  crease: string;
  shadow?: string;
  shade?: number;
  style?: React.CSSProperties;
}) => (
  <div
    className="absolute inset-0"
    style={{ filter: shadow ? `drop-shadow(${shadow})` : undefined, ...style }}
  >
    <div
      className={`paper paper-${handout.paperTexture} absolute inset-0`}
      style={{ ...paperBackground(handout), clipPath }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `${crease}, rgb(0 0 0 / ${shade})`,
        }}
      />
    </div>
  </div>
);

// Wax drawn in SVG. The source shapes encode height in their colour: the
// green channel marks the pressed-in centre, which the colour matrix turns
// into a lower alpha. The lighting filters read alpha as height, so the
// blurred rim lights up like a pooled edge and the pressed disc gets a step.
const WaxSealSvg = ({
  seed,
  roughness,
}: {
  seed: number;
  roughness: number;
}) => {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const rimId = `wax-rim-${id}`;
  const waxId = `wax-light-${id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full overflow-visible"
      style={{ filter: "drop-shadow(0 0.08em 0.1em rgb(0 0 0 / 0.45))" }}
    >
      <defs>
        <filter id={rimId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="2"
            seed={seed}
          />
          <feDisplacementMap
            in="SourceGraphic"
            scale={roughness}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id={waxId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 -0.28 0 1 0"
          />
          <feGaussianBlur stdDeviation="1.4" result="height" />
          <feDiffuseLighting
            in="height"
            surfaceScale="5"
            diffuseConstant="1"
            lightingColor="#fff"
            result="diffuse"
          >
            <feDistantLight azimuth="235" elevation="55" />
          </feDiffuseLighting>
          <feSpecularLighting
            in="height"
            surfaceScale="5"
            specularConstant="0.8"
            specularExponent="22"
            lightingColor="#fff"
            result="specular"
          >
            <feDistantLight azimuth="235" elevation="40" />
          </feSpecularLighting>
          {/* The pressed centre is a little darker and less glossy */}
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 -0.15 0 0 1  0 -0.15 0 0 1  0 -0.15 0 0 1  0 0 0 0 1"
            result="pressedShade"
          />
          <feFlood floodColor="#b3191f" result="wax" />
          <feComposite
            in="wax"
            in2="diffuse"
            operator="arithmetic"
            k1="1.25"
            result="litWax"
          />
          <feComposite
            in="litWax"
            in2="pressedShade"
            operator="arithmetic"
            k1="1"
            result="shadedWax"
          />
          <feComposite
            in="shadedWax"
            in2="specular"
            operator="arithmetic"
            k2="1"
            k3="0.55"
            result="glossyWax"
          />
          <feComposite in="glossyWax" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${waxId})`}>
        <circle cx="50" cy="50" r="41" fill="#f00" filter={`url(#${rimId})`} />
        <circle cx="50" cy="50" r="29" fill="#ff0" />
        {/* Raised border ring left by the stamp */}
        <circle
          cx="50"
          cy="50"
          r="25.5"
          fill="none"
          stroke="#f00"
          strokeWidth="1.2"
        />
      </g>
    </svg>
  );
};

const WaxSeal = ({ handout, top }: { handout: EnvelopeData; top: number }) => {
  const seal = handout.backSeal;
  const sealImage =
    WAX_SEAL_IMAGES[seal.sealImage] ?? Object.values(WAX_SEAL_IMAGES)[0];

  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: `${top}%`,
        width: `${seal.sealSize}cqw`,
        aspectRatio: "1 / 1",
        marginTop: `${seal.sealYOffset}cqw`,
        transform: "translate(-50%, -50%)",
        containerType: "inline-size",
        ...getImageProcessingStyles(seal),
      }}
    >
      {sealImage.src ? (
        <img
          src={sealImage.src}
          alt="Wax seal"
          className="absolute inset-0 w-full h-full object-contain"
        />
      ) : (
        <WaxSealSvg
          seed={sealImage.seed ?? 1}
          roughness={sealImage.roughness ?? 6}
        />
      )}

      {/* Highlight layer first so the pressed layer multiplies over it */}
      {(["carved-stone-highlight", "carved-stone-text"] as const).map(
        (layerClassName) => (
          <div
            key={layerClassName}
            className={classNames(
              "absolute flex items-center justify-center",
              `${layerClassName}-layer`,
            )}
            style={
              {
                left: `${sealImage.centreX}%`,
                top: `${sealImage.centreY}%`,
                transform: "translate(-50%, -50%)",
                "--carve-depth": 0.45,
              } as React.CSSProperties
            }
          >
            <span
              className={classNames(layerClassName, seal.sealGlyphFont)}
              style={{
                fontSize: `${sealImage.glyphSize * 100}cqw`,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {seal.sealGlyph.slice(0, 2)}
            </span>
          </div>
        ),
      )}
    </div>
  );
};

// Stamp margin on each side, as a fraction of the stamp's width
const STAMP_MARGIN = 0.08;
// Assumed until the uploaded image loads and reports its real shape
const DEFAULT_IMAGE_ASPECT = 1.2;

// Height / width of an image, read once it loads, so stamps of any shape
// keep their proportions
const useImageAspect = (src: string) => {
  const [aspect, setAspect] = useState<{ src: string; value: number }>();

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > 0) {
        setAspect({ src, value: img.naturalHeight / img.naturalWidth });
      }
    };
    img.src = src;
  }, [src]);

  return aspect?.src === src ? aspect.value : DEFAULT_IMAGE_ASPECT;
};

// Height / width of the whole stamp: the image plus its paper margin. The
// margin is padding in % of width, so it adds the same to every side.
const stampBoxAspect = (imageAspect: number) =>
  (1 - 2 * STAMP_MARGIN) * imageAspect + 2 * STAMP_MARGIN;

// Perforations as a CSS mask: a data-URL SVG whose transparent circles sit
// on the edges, half in and half out. Self-contained, so it survives export.
// The viewBox matches the stamp's shape so the holes stay round, and each
// edge gets a whole number of holes so the corners land on a hole.
const perforationMask = (boxAspect: number) => {
  const width = 50;
  const height = width * boxAspect;
  const across = Math.max(2, Math.round(width / 5));
  const down = Math.max(2, Math.round(height / 5));
  const holes: Array<[number, number]> = [];
  for (let i = 0; i <= across; i++) {
    const x = (i * width) / across;
    holes.push([x, 0], [x, height]);
  }
  for (let i = 1; i < down; i++) {
    const y = (i * height) / down;
    holes.push([0, y], [width, y]);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' preserveAspectRatio='none'><mask id='m'><rect width='${width}' height='${height}' fill='white'/>${holes
    .map(([x, y]) => `<circle cx='${x}' cy='${y}' r='1.7' fill='black'/>`)
    .join(
      "",
    )}</mask><rect width='${width}' height='${height}' fill='black' mask='url(#m)'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const STAMP_TOP = 4;
const STAMP_RIGHT = 4;

const PostageStamp = ({
  stamp,
  boxAspect,
}: {
  stamp: EnvelopeData["frontStamp"];
  boxAspect: number;
}) => {
  const maskImage = perforationMask(boxAspect);
  const mask: React.CSSProperties = stamp.perforated
    ? {
        maskImage,
        WebkitMaskImage: maskImage,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }
    : {};

  return (
    // The shadow lives on the wrapper, because the mask would cut it off
    <div
      className="absolute"
      style={{
        top: `${STAMP_TOP}cqw`,
        right: `${STAMP_RIGHT}cqw`,
        width: `${stamp.stampSize}cqw`,
        aspectRatio: `1 / ${boxAspect}`,
        transform: `rotate(${stamp.stampRotation}deg)`,
        filter: "drop-shadow(0 0.2cqw 0.3cqw rgb(0 0 0 / 0.35))",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: "#f4efe4",
          padding: `${STAMP_MARGIN * 100}%`,
          ...mask,
        }}
      >
        <img
          src={stamp.stampImage}
          alt="Postage stamp"
          className="block w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// With a stamp, the postmark moves to cancel its left edge, the way a clerk
// strikes a stamp. Without one it sits in the top right corner.
const postmarkPlacement = (
  handout: EnvelopeData,
  stampAspect: number,
): React.CSSProperties => {
  const { size, postmarkStyle, rotation } = handout.frontPostmark;
  const height = size * postmarkAspect(postmarkStyle);
  const stampSize = handout.frontStamp.stampSize;
  const hasStamp = !!handout.frontStamp.stampImage;

  return {
    width: `${size}cqw`,
    right: hasStamp
      ? `${STAMP_RIGHT + stampSize * 0.85 - size / 2}cqw`
      : "6cqw",
    top: hasStamp
      ? `${STAMP_TOP + (stampSize * stampAspect) / 2 - height / 2}cqw`
      : "5cqw",
    transform: `rotate(${rotation}deg)`,
  };
};

const EnvelopeFront = ({ handout }: { handout: EnvelopeData }) => {
  const returnAddress = handout.frontReturnAddress;
  const stampAspect = stampBoxAspect(
    useImageAspect(handout.frontStamp.stampImage),
  );

  return (
    <>
      {returnAddress.text && (
        <div
          className={classNames(
            "absolute",
            handout.inkColor,
            returnAddress.font,
          )}
          style={{
            top: "5cqw",
            left: "6cqw",
            maxWidth: "45cqw",
            fontSize: `${returnAddress.fontSize}cqw`,
            lineHeight: 1.25,
            whiteSpace: "pre-line",
            mixBlendMode: "multiply",
            transform: `rotate(${returnAddress.rotation}deg)`,
          }}
        >
          {returnAddress.text}
        </div>
      )}

      {handout.frontStamp.stampImage && (
        <PostageStamp stamp={handout.frontStamp} boxAspect={stampAspect} />
      )}

      {handout.frontPostmark.showPostmark && (
        <Postmark
          postmarkStyle={handout.frontPostmark.postmarkStyle}
          text={handout.frontPostmark.text}
          centreText={handout.frontPostmark.centreText}
          inkColor={handout.frontPostmark.postmarkInk}
          style={postmarkPlacement(handout, stampAspect)}
        />
      )}

      {/* Centred slightly below the middle, like a hand-addressed envelope */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{
          paddingTop: "10%",
          paddingLeft: "8cqw",
          paddingRight: "8cqw",
        }}
      >
        {/* Rotating this inner box, not the full-size one above, keeps the
            pivot on the centre of the text */}
        <div
          className="w-full"
          style={{ transform: `rotate(${handout.addressRotation}deg)` }}
        >
          {handout.addressLines.map((line) => (
            <div
              key={line.id}
              className="w-full"
              style={{ fontSize: `${line.fontSize}cqw`, lineHeight: 1.3 }}
            >
              <Markdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                className={`block ${line.textAlign} ${handout.inkColor} ${line.font} ${line.fontWeight} copy-markdown w-full`}
              >
                {line.mainCopy}
              </Markdown>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const EnvelopeBack = ({ handout }: { handout: EnvelopeData }) => {
  const depth = TOP_FLAP_DEPTH[handout.flapStyle] ?? TOP_FLAP_DEPTH.pointed;
  const topFlap = topFlapClipPath(handout.flapStyle, depth);
  const crease = (direction: string) =>
    `linear-gradient(${direction}, rgb(0 0 0 / 0.16), rgb(0 0 0 / 0.04) 3%, transparent 8%)`;

  return (
    <>
      {/* Inside of the envelope, only visible once the top flap is up */}
      {handout.isOpened && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgb(0 0 0 / 0.38), rgb(0 0 0 / 0.22) 50%)",
          }}
        />
      )}
      <Flap
        handout={handout}
        clipPath={BOTTOM_FLAP}
        crease={crease("to top")}
        shadow="0 -0.3cqw 0.5cqw rgb(0 0 0 / 0.25)"
      />
      <Flap
        handout={handout}
        clipPath={LEFT_FLAP}
        crease={crease("to right")}
        shadow="0.3cqw 0 0.5cqw rgb(0 0 0 / 0.25)"
        shade={0.03}
      />
      <Flap
        handout={handout}
        clipPath={RIGHT_FLAP}
        crease={crease("to left")}
        shadow="-0.3cqw 0 0.5cqw rgb(0 0 0 / 0.25)"
        shade={0.03}
      />
      {!handout.isOpened && (
        <Flap
          handout={handout}
          clipPath={topFlap}
          crease={crease("to bottom")}
          shadow="0 0.5cqw 0.7cqw rgb(0 0 0 / 0.35)"
        />
      )}
    </>
  );
};

export const Envelope = ({ handout }: { handout: EnvelopeData }) => {
  const isBack = handout.side === "back";
  const isOpenedBack = isBack && handout.isOpened;
  const depth = TOP_FLAP_DEPTH[handout.flapStyle] ?? TOP_FLAP_DEPTH.pointed;
  const [ratioW, ratioH] = handout.aspectRatio.split("/").map(Number);
  // Padding % is relative to width, so convert the flap depth (a % of the
  // envelope height) to make room above for the opened flap
  const openFlapRoom = isOpenedBack ? (depth * ratioH) / ratioW : 0;

  return (
    <div
      className="max-w-[80em]"
      style={{
        width: `${handout.pageWidth}cqw`,
        paddingTop: `${openFlapRoom}%`,
      }}
    >
      <div
        className="relative w-full"
        style={{
          containerType: "inline-size",
          aspectRatio: handout.aspectRatio,
        }}
      >
        <div
          className={`paper paper-${handout.paperTexture} absolute inset-0 overflow-hidden`}
          style={paperBackground(handout)}
        >
          {isBack ? (
            <EnvelopeBack handout={handout} />
          ) : (
            <EnvelopeFront handout={handout} />
          )}
          {handout.isPaperShadow && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 3cqw rgb(0 0 0 / 0.55)" }}
            />
          )}
        </div>

        {/* Flipped up from the top edge, so we see the inside of the flap */}
        {isOpenedBack && (
          <Flap
            handout={handout}
            clipPath={topFlapClipPath(handout.flapStyle, depth)}
            crease="linear-gradient(to bottom, rgb(0 0 0 / 0.2), transparent 10%)"
            shade={0.1}
            style={{
              transformOrigin: "top",
              transform: "rotateX(180deg)",
            }}
          />
        )}

        {/* No cracked-seal art yet, so an opened envelope hides the seal */}
        {isBack && !handout.isOpened && handout.backSeal.showSeal && (
          <WaxSeal handout={handout} top={depth} />
        )}
      </div>
    </div>
  );
};

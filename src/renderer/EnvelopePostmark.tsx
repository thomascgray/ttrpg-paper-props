import { useId } from "react";
import classNames from "classnames";

// Each style draws its main mark inside `viewBox`, and the renderer sizes the
// mark by its width. Cancel lines and bars sit at negative x and spill out to
// the left through overflow: visible, so rotation pivots on the mark itself.
// Everything strokes and fills with currentColor, so the ink class colours it.

type MarkProps = { id: string; text: string; centreText: string };

const ink = { fill: "none", stroke: "currentColor" } as const;

const ArcText = ({
  id,
  d,
  text,
  fontSize,
  letterSpacing = 1.5,
}: {
  id: string;
  d: string;
  text: string;
  fontSize: number;
  letterSpacing?: number;
}) => (
  <>
    <defs>
      <path id={id} d={d} />
    </defs>
    {/* A textPath drops any glyph past the end of the path, so very long
        town names get cut off. The arcs are as long as each ring allows. */}
    <text
      fill="currentColor"
      fontSize={fontSize}
      fontWeight="bold"
      letterSpacing={letterSpacing}
      className="font-im-fell-display"
    >
      <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
        {text}
      </textPath>
    </text>
  </>
);

const CentreText = ({
  x,
  y,
  text,
  fontSize,
}: {
  x: number;
  y: number;
  text: string;
  fontSize: number;
}) => (
  <text
    x={x}
    y={y}
    fill="currentColor"
    fontSize={fontSize}
    textAnchor="middle"
    dominantBaseline="middle"
    className="font-im-fell-display"
  >
    {text}
  </text>
);

// Ring text that runs 240° round the circle, from lower left to lower right
const ringArc = (r: number) => {
  const dx = r * Math.cos(Math.PI / 6);
  const dy = r * Math.sin(Math.PI / 6);
  return `M ${50 - dx} ${50 + dy} A ${r} ${r} 0 1 1 ${50 + dx} ${50 + dy}`;
};

const WavyMark = ({ id, text, centreText }: MarkProps) => (
  <>
    {[38, 46, 54, 62].map((y) => (
      <path
        key={y}
        d={`M -106 ${y} q 9 -5 18 0 t 18 0 t 18 0 t 18 0 t 18 0 t 18 0`}
        {...ink}
        strokeWidth="2.2"
      />
    ))}
    <circle cx="50" cy="50" r="47" {...ink} strokeWidth="3" />
    <circle cx="50" cy="50" r="25" {...ink} strokeWidth="1.6" />
    <ArcText id={id} d={ringArc(33)} text={text} fontSize={13} />
    <CentreText
      x={50}
      y={51}
      text={centreText || "✶"}
      fontSize={centreText ? 11 : 18}
    />
  </>
);

const DuplexMark = ({ id, text, centreText }: MarkProps) => (
  <>
    <defs>
      <clipPath id={`${id}-bars`}>
        <ellipse cx="-50" cy="50" rx="44" ry="38" />
      </clipPath>
    </defs>
    <g clipPath={`url(#${id}-bars)`}>
      {[12, 23, 34, 45, 56, 67, 78].map((y) => (
        <rect
          key={y}
          x="-96"
          y={y}
          width="92"
          height="6.5"
          fill="currentColor"
        />
      ))}
    </g>
    <circle cx="50" cy="50" r="47" {...ink} strokeWidth="3" />
    <ArcText id={id} d={ringArc(35)} text={text} fontSize={14} />
    <CentreText
      x={50}
      y={52}
      text={centreText || "✶"}
      fontSize={centreText ? 12 : 20}
    />
  </>
);

const BandMark = ({ id, text, centreText }: MarkProps) => (
  <>
    <circle cx="50" cy="50" r="47" {...ink} strokeWidth="2.4" />
    <circle cx="50" cy="50" r="42" {...ink} strokeWidth="1.2" />
    <path d="M 8.4 44 H 91.6 M 9.8 62 H 90.2" {...ink} strokeWidth="1.4" />
    {/* Short arc above the band, so the town name never runs into it */}
    <ArcText
      id={id}
      d="M 19.1 41.7 A 32 32 0 0 1 80.9 41.7"
      text={text}
      fontSize={9.5}
      letterSpacing={0.8}
    />
    <CentreText x={50} y={53.5} text={centreText || "✶ ✶ ✶"} fontSize={10} />
    <CentreText x={50} y={77} text="✶" fontSize={12} />
  </>
);

const OvalMark = ({ id, text, centreText }: MarkProps) => (
  <>
    <ellipse cx="70" cy="45" rx="67" ry="42" {...ink} strokeWidth="2.5" />
    <ellipse cx="70" cy="45" rx="46" ry="24" {...ink} strokeWidth="1.2" />
    <ArcText
      id={id}
      d="M 16 45 A 54 31 0 0 1 124 45"
      text={text}
      fontSize={12}
    />
    <CentreText
      x={70}
      y={46}
      text={centreText || "✶"}
      fontSize={centreText ? 12 : 18}
    />
    <CentreText x={70} y={78} text="✶  ✶  ✶" fontSize={7} />
  </>
);

const BoxedMark = ({ text, centreText }: MarkProps) => {
  // Squeeze long names into the box instead of letting them overflow
  const squeeze =
    text.length > 9 ? { textLength: 96, lengthAdjust: "spacingAndGlyphs" } : {};
  return (
    <>
      <rect x="2" y="2" width="116" height="56" {...ink} strokeWidth="2.5" />
      <rect x="6.5" y="6.5" width="107" height="47" {...ink} strokeWidth="1" />
      <text
        x="60"
        y={centreText ? 27 : 31}
        fill="currentColor"
        fontSize={centreText ? 15 : 17}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="1.5"
        className="font-im-fell-display"
        {...squeeze}
      >
        {text}
      </text>
      {centreText && (
        <CentreText x={60} y={44} text={centreText} fontSize={10} />
      )}
    </>
  );
};

// Serrated outer edge, like an official or customs handstamp
const TEETH = 44;
const toothedEdge = Array.from({ length: TEETH * 2 }, (_, i) => {
  const angle = (i / (TEETH * 2)) * Math.PI * 2;
  const r = i % 2 === 0 ? 49 : 44.5;
  return `${(50 + r * Math.cos(angle)).toFixed(2)},${(50 + r * Math.sin(angle)).toFixed(2)}`;
}).join(" ");

const ToothedMark = ({ id, text, centreText }: MarkProps) => (
  <>
    <polygon
      points={toothedEdge}
      {...ink}
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="50" cy="50" r="40" {...ink} strokeWidth="1.4" />
    <circle cx="50" cy="50" r="22" {...ink} strokeWidth="1.4" />
    <ArcText
      id={id}
      d={ringArc(28.5)}
      text={text}
      fontSize={10.5}
      letterSpacing={1}
    />
    <CentreText
      x={50}
      y={51}
      text={centreText || "✶"}
      fontSize={centreText ? 9 : 16}
    />
  </>
);

const POSTMARK_MARKS: Record<
  string,
  { width: number; height: number; Mark: (props: MarkProps) => React.ReactNode }
> = {
  wavy: { width: 100, height: 100, Mark: WavyMark },
  duplex: { width: 100, height: 100, Mark: DuplexMark },
  band: { width: 100, height: 100, Mark: BandMark },
  oval: { width: 140, height: 90, Mark: OvalMark },
  boxed: { width: 120, height: 60, Mark: BoxedMark },
  toothed: { width: 100, height: 100, Mark: ToothedMark },
};

export const postmarkAspect = (postmarkStyle: string) => {
  const { width, height } =
    POSTMARK_MARKS[postmarkStyle] ?? POSTMARK_MARKS.wavy;
  return height / width;
};

export const Postmark = ({
  postmarkStyle,
  text,
  centreText,
  inkColor,
  style,
}: {
  postmarkStyle: string;
  text: string;
  centreText: string;
  inkColor: string;
  style: React.CSSProperties;
}) => {
  const id = `postmark-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { width, height, Mark } =
    POSTMARK_MARKS[postmarkStyle] ?? POSTMARK_MARKS.wavy;

  return (
    <div
      className={classNames(
        "absolute rough-edges-subtle pointer-events-none",
        inkColor,
      )}
      style={{ opacity: 0.6, mixBlendMode: "multiply", ...style }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block w-full h-auto overflow-visible"
      >
        <Mark id={id} text={text} centreText={centreText} />
      </svg>
    </div>
  );
};

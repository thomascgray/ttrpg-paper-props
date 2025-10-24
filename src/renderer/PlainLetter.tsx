import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PlainLetterConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba } from "../utils";

type PlainLetterData = ExtractConfigValues<typeof PlainLetterConfig>;

export const PlainLetter = ({ handout }: { handout: PlainLetterData }) => {
  const paperTint = hexToRgba(handout.paperTint, 0.5);

  return (
    <div
      style={{
        backgroundColor: paperTint,
        backgroundBlendMode: "multiply",
        width: `${handout.pageWidth}cqw`,
        boxShadow: `${
          handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
        }`,
      }}
      className={`paper paper-${handout.paperTexture} max-w-[80em]`}
    >
      <div
        className="w-full h-full"
        style={{
          containerType: handout.maintainAspectRatio ? "inline-size" : "normal",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: `${handout.paragraphGap}cqw`,
            padding: `${handout.padding}cqw`,
          }}
        >
          {handout.paragraph.map((p, idx) => {
            return (
              <div
                key={p.id}
                id="main_copy"
                className="flex h-full items-center w-full"
                style={{
                  fontSize: `${p.fontSize}cqw`,
                }}
              >
                <Markdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  className={`block ${p.textAlign} ${handout.inkColor} ${p.font} ${p.fontWeight} copy-markdown list-inside list-disc w-full`}
                >
                  {p.mainCopy}
                </Markdown>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

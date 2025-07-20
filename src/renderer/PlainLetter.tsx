import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PlainLetterConfig, ExtractConfigValues } from "../db";
import { hexToRgba } from "../utils";

type PlainLetterData = ExtractConfigValues<typeof PlainLetterConfig>;

export const PlainLetter = ({ handout }: { handout: PlainLetterData }) => {
  const paperTint = hexToRgba(handout.paperTint, 0.5);

  return (
    <div
      style={{
        backgroundColor: paperTint,
        backgroundBlendMode: "multiply",
        width: `${handout.pageWidth}px`,
        boxShadow: `${
          handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
        }`,
        marginTop: `${handout.positioning.yOffset}%`,
        marginLeft: `${handout.positioning.xOffset}%`,
        padding: `${handout.padding}px`,
      }}
      className={`paper paper-${handout.paperTexture} transition-all`}
    >
      <div
        className="flex flex-col"
        style={{
          gap: `${handout.paragraphGap}px`,
        }}
      >
        {handout.paragraph.map((p, idx) => {
          return (
            <div
              key={p.id}
              id="main_copy"
              className="flex h-full items-center w-full"
              style={{
                fontSize: `${p.fontSize}px`,
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
  );
};

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PLAIN_LETTER } from "../config2";
import { hexToRgba } from "../utils";

export const PlainLetter = ({
  handout,
}: {
  handout: (typeof PLAIN_LETTER)["data"];
}) => {
  const paperTint = hexToRgba(handout.paper_tint.value, 0.5);

  return (
    <div
      style={{
        backgroundColor: paperTint,
        backgroundBlendMode: "multiply",
        width: `${handout.page_width.value}px`,
        boxShadow: `${
          handout.is_paper_shadow.value ? "inset 0 0 25px #000000" : "none"
        }`,
        marginTop: `${handout.positioning.y_offset.value}%`,
        marginLeft: `${handout.positioning.x_offset.value}%`,
        padding: `${handout.padding.value}px`,
      }}
      className={`paper paper-${handout.paper_texture.value}`}
    >
      <div
        className="flex flex-col"
        style={{
          gap: `${handout.paragraph_gap.value}px`,
        }}
      >
        {handout.paragraph.map((p, idx) => {
          return (
            <div
              key={p.id}
              id="main_copy"
              className="flex h-full items-center w-full"
              style={{
                fontSize: `${p.font_size.value}px`,
              }}
            >
              <Markdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                className={`block ${p.text_align.value} ${handout.ink_color.value} ${p.font.value} ${p.font_weight.value} copy-markdown list-inside list-disc w-full`}
              >
                {p.main_copy.value}
              </Markdown>
            </div>
          );
        })}
      </div>
    </div>
  );
};

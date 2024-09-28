import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PLAIN_LETTER } from "../config2";

export const PlainLetter = ({
  handout,
}: {
  handout: (typeof PLAIN_LETTER)["data"];
}) => {
  return (
    <div
      style={{
        width: `${handout.page_width.value}px`,
        boxShadow: `${
          handout.is_paper_shadow.value ? "inset 0 0 25px #000000" : "none"
        }`,
        marginTop: `${handout.positioning.y_offset.value}%`,
        marginLeft: `${handout.positioning.x_offset.value}%`,
      }}
      className={`paper paper-${handout.paper_texture.value}`}
    >
      <div
        className={`flex h-full items-center`}
        style={{
          fontSize: `${handout.font_size.value}px`,
          padding: `${handout.padding.value}px`,
        }}
      >
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          className={`block ${handout.text_align.value} ${handout.ink_color.value} ${handout.font.value} ${handout.font_weight.value} copy-markdown list-inside list-disc`}
        >
          {handout.main_copy.value}
        </Markdown>
      </div>
    </div>
  );
};

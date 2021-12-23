import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { PAPER_TYPES } from "../../config";

export const HandwrittenLetter = (
  props: typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"]
) => {
  console.log("props.main_copy", JSON.stringify(props.main_copy, null, 2));
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
        width: `${props.page_width_percentage}%`,
        boxShadow: `${
          props.is_paper_shadow ? "inset 0 0 25px #000000" : "none"
        }`,
      }}
      className={`paper paper-${props.paper_texture} transform mx-auto`}
    >
      <div className={`flex h-full items-center ${props.padding}`}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          className={`block ${props.text_alignment} ${props.ink_color} ${props.font} ${props.font_size} ${props.font_weight} copy-markdown list-inside list-disc`}
        >
          {props.main_copy}
        </Markdown>
      </div>
    </div>
  );
};

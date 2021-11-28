import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PAPER_TYPES } from "../../config";

export const HandwrittenLetter = (
  props: typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
        width: `${props.page_width_percentage}%`,
      }}
      className={`paper paper-${props.paper_texture} overflow-hidden transition transform mx-auto`}
    >
      <div className="flex h-full items-center mx-10 px-8 py-12">
        <div className="space-y-8">
          <Markdown
            remarkPlugins={[remarkGfm]}
            className={`block ${props.ink_color} ${props.font} ${props.font_size} ${props.font_weight} copy-markdown list-inside list-disc`}
          >
            {props.main_copy}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

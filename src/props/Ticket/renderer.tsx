import React from "react";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { PAPER_TYPES } from "../../config";

export const Ticket = (
  props: typeof PAPER_TYPES["TICKET"]["data"]
) => {
  return (
    <div className="bottom-border-zag">

      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
          width: `${props.page_width}px`,
          height: `${props.page_height}px`,
        }}
        className={`paper transition paper-${props.paper_texture} overflow-hidden transition transform mx-auto`}
      >
        <div className="flex h-full items-center mx-10 px-8 py-12">
          <div className="space-y-8">
            {/* <Markdown
              className={`block ${props.font} ${props.font_size} ${props.font_weight} copy-markdown`}
            >
              {props.prefix}
            </Markdown> */}
            {/* <Markdown
              className={`block ${props.font} ${props.font_size} ${props.font_weight} copy-markdown`}
            >
              {props.main_copy}
            </Markdown> */}
            {/* <Markdown
              className={`block ${props.font} ${props.font_size} ${props.font_weight} copy-markdown`}
            >
              {props.suffix}
            </Markdown> */}
          </div>
        </div>
      </div>
    </div>
  );
};

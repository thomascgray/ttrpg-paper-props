import React from "react";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { PAPER_TYPES } from "../config";

export const NewspaperClipping = (
  props: typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg)`,
        width: `${props.page_width}px`,
        height: `${props.page_height}px`,
      }}
      className={`paper transition paper-${props.paper_texture} overflow-hidden transition transform mx-auto mt-8`}
    >
      <div className="flex h-full items-center border-2 border-black border-t-0 border-b-0 mx-10 px-8">
        <div className="space-y-8">
          <Markdown
            className={classNames(
              "block font-serif text-justify copy-markdown clipping-markdown",
              {
                blurry: props.is_prefix_blurry,
              }
            )}
          >
            {props.prefix_copy}
          </Markdown>
          <Markdown className="block font-serif text-justify copy-markdown clipping-markdown">
            {props.main_copy}
          </Markdown>
          <Markdown
            className={classNames(
              "block font-serif text-justify copy-markdown clipping-markdown",
              {
                blurry: props.is_suffix_blurry,
              }
            )}
          >
            {props.suffix_copy}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import classNames from "classnames";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";

export const NewspaperClipping = (
  props: typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
        width: `${props.page_width}px`,
        height: `${props.page_height}px`,
      }}
      className={`paper transition paper-${props.paper_texture} overflow-hidden transition transform mx-auto`}
    >
      <div className="flex h-full items-center border-2 border-black border-t-0 border-b-0 mx-10 px-8">
        <div
          className="space-y-8"
          style={{
            filter: `${props.image_filter}`,
          }}
        >
          {props.prefix_copy && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${props.font}`,
                {
                  blurry: props.is_prefix_blurry,
                }
              )}
            >
              {props.prefix_copy}
            </Markdown>
          )}
          {props.main_copy && (
            <Markdown
              className={`block font-serif text-justify prose copy-markdown clipping-markdown ${props.font}`}
            >
              {props.main_copy}
            </Markdown>
          )}
          {props.suffix_copy && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${props.font}`,
                {
                  blurry: props.is_suffix_blurry,
                }
              )}
            >
              {props.suffix_copy}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

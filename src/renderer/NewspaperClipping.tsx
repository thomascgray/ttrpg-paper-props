import React from "react";
import classNames from "classnames";
import Markdown from "react-markdown";
import { NEWSPAPER_CLIPPING } from "../config2";

export const NewspaperClipping = ({
  handout,
}: {
  handout: (typeof NEWSPAPER_CLIPPING)["data"];
}) => {
  return (
    <div
      style={{
        width: `${handout.dimensions.page_width.value}px`,
        height: `${handout.dimensions.page_height.value}px`,
        boxShadow: `${
          handout.paper.is_paper_shadow.value
            ? "inset 0 0 25px #000000"
            : "none"
        }`,
      }}
      className={classNames(
        `paper transition paper-${handout.paper.paper_texture.value}`
      )}
    >
      <div
        className={`flex h-full items-center border-2 border-t-0 border-b-0 mx-10 px-8 overflow-hidden ${handout.ink_color.value}`}
      >
        <div className="space-y-8">
          {handout.prefix_copy.value !== "" && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${handout.font.value} ${handout.ink_color.value} ${handout.image_filter.value}`,
                {
                  blurry: handout.is_prefix_blurry.value,
                }
              )}
            >
              {handout.prefix_copy.value}
            </Markdown>
          )}
          {handout.main_copy.value !== "" && (
            <Markdown
              className={`block font-serif text-justify prose copy-markdown clipping-markdown ${handout.font.value} ${handout.ink_color.value} ${handout.image_filter.value}`}
            >
              {handout.main_copy.value}
            </Markdown>
          )}
          {handout.suffix_copy.value !== "" && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${handout.font.value} ${handout.ink_color.value} ${handout.image_filter.value}`,
                {
                  blurry: handout.is_suffix_blurry.value,
                }
              )}
            >
              {handout.suffix_copy.value}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Markdown from "react-markdown";
import { LABELLED_LIQUID } from "../config";

export const LabelledLiquid = ({
  handout,
}: {
  handout: (typeof LABELLED_LIQUID)["data"];
}) => {
  return (
    <div
      style={{
        marginTop: `${handout.positioning.y_offset.value}%`,
        marginLeft: `${handout.positioning.x_offset.value}%`,
      }}
      className="relative"
    >
      <img
        src={handout.image_template.value}
        alt="The book cover"
        style={{
          width: `${handout.image_width.value}px`,
          transform: `rotate(${handout.image_rotation.value}deg)`,
          filter: `hue-rotate(${handout.image_hue_filter.value}deg)`,
        }}
      />

      <div
        id="main_copy"
        style={{
          fontSize: `${handout.font_size.value}px`,
          marginLeft: `${handout.text_left_margin.value}px`,
          marginTop: `${handout.text_top_margin.value}%`,
          width: `${handout.text_width.value}%`,
          transform: `rotate(${handout.text_rotation.value}deg)`,
        }}
        className={`absolute ${handout.text_effect.value} ${handout.font.value} ${handout.font_weight.value} top-[2em] left-[2em]`}
      >
        <Markdown
          className={`block copy-markdown ${handout.ink_color.value} ${handout.text_align.value}`}
        >
          {handout.main_copy.value}
        </Markdown>
      </div>
    </div>
  );
};

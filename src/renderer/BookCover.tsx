import React from "react";
import Markdown from "react-markdown";
import { BOOK_COVER } from "../config2";

export const BookCover = ({
  handout,
}: {
  handout: (typeof BOOK_COVER)["data"];
}) => {
  return (
    <div
      style={{
        marginTop: `${handout.positioning.y_offset.value}%`,
        marginLeft: `${handout.positioning.x_offset.value}%`,
      }}
      className="relative"
    >
      <div className={`image-wrapper`}>
        <img
          src={handout.book_cover_template.value}
          alt="The book cover"
          width={700}
        />
      </div>

      <div
        id="main_copy"
        style={{
          fontSize: `${handout.font_size.value}px`,
          marginLeft: `${handout.text_left_margin.value}px`,
          width: "80%",
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

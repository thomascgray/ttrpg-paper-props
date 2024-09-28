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
      <div
        className={`image-wrapper w-[80vw] h-[80vh] m-auto flex justify-center`}
      >
        <img
          style={
            {
              // transform: `translateX(${handout.extra_left_margin}em)`,
            }
          }
          src={handout.book_cover_template.value}
          alt="The book cover"
        />
      </div>

      <div
        style={{
          top: "9%",
          left: "27%",
          width: "47%",
          height: "81%",
          fontSize: `${handout.font_size.value}px`,
        }}
        className={`absolute p-12 ${handout.text_effect.value} ${handout.font.value}`}
      >
        <Markdown
          className={`block copy-markdown font-extrabold ${handout.ink_color.value} ${handout.text_align.value}`}
        >
          {handout.main_copy.value}
        </Markdown>
      </div>
    </div>
  );
};

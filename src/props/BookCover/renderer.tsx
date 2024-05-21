import React from "react";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";

export const BookCover = (
  props: (typeof PAPER_TYPES)["BOOK_COVER"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
        marginTop: `${props.y_offset}%`,
        marginLeft: `${props.x_offset}%`,
      }}
      className="relative"
    >
      <div
        className={`image-wrapper w-[80vw] h-[80vh] m-auto flex justify-center ${props.book_cover_template_image_effect}`}
      >
        <img
          style={{
            transform: `translateX(${props.extra_left_margin}em)`,
          }}
          src={props.book_cover_template}
          alt="The book cover"
        />
      </div>

      <div
        style={{
          top: "9%",
          left: "27%",
          width: "47%",
          height: "81%",
        }}
        className={`absolute p-12 ${props.text_effect} ${props.font}`}
      >
        <Markdown
          className={`block prose ${props.prose_size} max-w-none text-center font-extrabold ${props.ink_color}`}
        >
          {props.main_copy}
        </Markdown>
      </div>
    </div>
  );
};

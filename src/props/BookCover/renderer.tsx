import React from "react";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";

export const BookCover = (props: typeof PAPER_TYPES["BOOK_COVER"]["data"]) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
      }}
      className="relative transition transform"
    >
      <div
        className={`image-wrapper w-full m-auto flex justify-center  ${props.book_cover_template_image_effect}`}
      >
        <img
          style={{
            transform: `translateX(${props.extra_left_margin}em)`,
            width: `${props.zoom_level_percentage}%`,
          }}
          src={props.book_cover_template}
          alt=""
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

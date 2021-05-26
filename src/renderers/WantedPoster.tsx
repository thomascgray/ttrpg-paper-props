import React from "react";
import { PAPER_TYPES } from "../config";

// @ts-ignore
import { Textfit } from "react-textfit";
import classNames from "classnames";

export const WantedPoster = (
  props: typeof PAPER_TYPES["WANTED_POSTER"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
        width: `${props.page_width}px`,
      }}
      className={`paper transition paper-${props.paper_texture} transform w-4/5 mx-auto p-10`}
    >
      <Textfit mode="single">
        <h1
          style={{
            lineHeight: "6rem",
          }}
          className={`border-4 border-gray-800 border-l-0 border-r-0 border-solid font-serif font-black text-center ${props.headline_font}`}
        >
          {props.headline}
        </h1>
      </Textfit>
      <Textfit mode="single" max={18}>
        <h2
          className={`mt-4 font-serif font-black text-center ${props.subtitle_font}`}
        >
          {props.subtitle}
        </h2>
      </Textfit>

      <img
        className="border-4 border-solid border-gray-900 mx-auto mt-6"
        src={props.image_url}
        alt=""
      />

      <Textfit mode="single" max={50}>
        <h1
          className={`mt-4 font-serif font-black text-center ${props.subtitle2_font}`}
        >
          {props.subtitle2}
        </h1>
      </Textfit>
    </div>
  );
};

import React from "react";
// @ts-ignore
import { Textfit } from "react-textfit";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { PAPER_TYPES } from "../config";

export const Newspaper = (props: typeof PAPER_TYPES["NEWSPAPER"]["data"]) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg)`,
        width: `${props.page_width_percentage}%`,
      }}
      className={`paper transition paper-${props.paper_texture} transition transform mx-auto mt-8 px-10 py-10`}
    >
      <div className="">
        <Textfit mode="single" max={35}>
          <h1 className={`${props.title_font} font-black text-center`}>
            {props.title}
          </h1>
        </Textfit>
      </div>

      <hr className="border-solid border-2 border-gray-600" />

      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-gray-800 font-bold font-serif">
          {props.banner_text}
        </span>

        <span className="text-sm uppercase text-gray-800 font-bold font-serif">
          {new Date(props.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <hr className="border-solid border-2 border-gray-600" />

      <Textfit mode="single" max={120}>
        <h2 className={`${props.headline_font} font-semibold text-justify`}>
          {props.headline}
        </h2>
      </Textfit>

      <hr className="border-solid border-4 border-gray-800 my-4" />

      {props.quote !== "" && (
        <p className="font-serif font-bold text-3xl text-justify italic my-4">
          {props.quote}
        </p>
      )}

      <Markdown
        className={classNames(
          `text-justify font-serif copy-markdown column-count-${props.main_copy_columns}`,
          {
            blurry: props.is_main_copy_blurry,
          }
        )}
      >
        {props.main_copy}
      </Markdown>
    </div>
  );
};

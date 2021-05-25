import React from "react";
import { PAPER_TYPES } from "../config";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Textfit } from "react-textfit";

export const Newspaper = (props: typeof PAPER_TYPES["NEWSPAPER"]["data"]) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg)`,
        width: `${props.page_width_percentage}%`,
      }}
      className="paper transform bg-yellow-50 mx-auto mt-8 px-10 py-10"
    >
      <div className="">
        <Textfit mode="single" max="35">
          <h1 className="font-sans font-black text-center">{props.title}</h1>
        </Textfit>
      </div>

      <hr className="border-solid border-2 border-gray-600" />

      <div className="flex items-center justify-between py-2">
        {props.banner_text !== "" &&
          props.banner_text.split("::").map((text) => {
            return (
              <span className="text-sm text-gray-800 font-bold font-serif">
                {text}
              </span>
            );
          })}

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

      <Textfit mode="single" max="120">
        <h2 className="font-semibold font-serif text-justify">
          {props.headline}
        </h2>
      </Textfit>

      <hr className="border-solid border-4 border-gray-800 my-4" />

      {props.quote !== "" && (
        <p className="font-serif font-bold text-3xl text-justify italic my-4">
          {props.quote}
        </p>
      )}

      <ReactMarkdown
        className={`text-justify font-serif newspaper-markdown column-count-${props.main_copy_columns}`}
      >
        {props.main_copy}
      </ReactMarkdown>
    </div>
  );
};

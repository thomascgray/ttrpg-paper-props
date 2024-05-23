import React from "react";
// @ts-ignore
import { Textfit } from "react-textfit";
import classNames from "classnames";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";

export const Newspaper = (props: (typeof PAPER_TYPES)["NEWSPAPER"]["data"]) => {
  return (
    <React.Fragment>
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
          width: `${props.page_width_percentage}%`,
          boxShadow: `${
            props.is_paper_shadow ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${props.y_offset}%`,
          marginLeft: `${props.x_offset}%`,
        }}
        className={`paper paper-${props.paper_texture} ${props.ink_color} p-10`}
      >
        <div>
          <Textfit mode="single" max={35}>
            <h1
              className={`newspaper-title ${props.title_font} font-black text-center`}
              style={{
                fontSize: `${props.title_size}px`,
              }}
            >
              {props.title}
            </h1>
          </Textfit>
        </div>

        {!props.hide_top_banner_border && (
          <hr className="border-solid border-2 border-gray-600" />
        )}

        <div className="flex justify-between py-2">
          <label
            style={{
              fontSize: `${props.banner_size}px`,
            }}
            className={`text-left text-gray-800 font-bold font-serif w-4/12 ${props.banner_font}`}
          >
            {props.banner_text_1}
          </label>

          <label
            style={{
              fontSize: `${props.banner_size}px`,
            }}
            className={`text-center text-gray-800 font-bold font-serif w-4/12 ${props.banner_font}`}
          >
            {props.banner_text_2}
          </label>

          <label
            style={{
              fontSize: `${props.banner_size}px`,
            }}
            className={`text-right text-gray-800 font-bold font-serif w-4/12 ${props.banner_font}`}
          >
            {props.banner_text_3}
          </label>
        </div>

        {!props.hide_bottom_banner_border && (
          <hr className="border-solid border-2 border-gray-600" />
        )}

        <Textfit mode="single" max={120}>
          <h2 className={`${props.headline_font} font-semibold text-justify`}>
            {props.headline}
          </h2>
        </Textfit>

        <hr className="border-solid border-4 border-gray-800 my-4" />

        {props.quote !== "" && (
          <p
            style={{
              fontSize: `${props.quote_size}px`,
            }}
            className={`font-serif font-bold text-justify italic my-4 ${props.quote_font}`}
          >
            {props.quote}
          </p>
        )}

        <Markdown
          className={classNames(
            `text-justify font-serif copy-markdown column-count-${props.main_copy_columns} ${props.image_filter}`,
            {
              blurry: props.is_main_copy_blurry,
            }
          )}
        >
          {props.main_copy}
        </Markdown>
      </div>
    </React.Fragment>
  );
};

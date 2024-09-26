import React from "react";
// @ts-ignore
// import { Textfit } from "react-textfit";
import classNames from "classnames";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";
import { Headline } from "../../components/Headline";
import { NEWSPAPER, NewspaperType } from "../../config2";

export const Newspaper = ({
  handout,
}: {
  handout: (typeof NEWSPAPER)["data"];
}) => {
  return (
    <React.Fragment>
      <div
        style={{
          transform: `rotate(${handout.rotation_degrees.value}deg) scale(${handout.zoom.value})`,
          width: `${handout.page_width_percentage.value}%`,
          boxShadow: `${
            handout.is_paper_shadow.value ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${handout.y_offset.value}%`,
          marginLeft: `${handout.x_offset.value}%`,
        }}
        className={`paper paper-${handout.paper_texture.value} ${handout.ink_color.value} p-10`}
      >
        <div id="title">
          <span
            className={`${handout.title.title_font.value} font-black text-center flex items-center justify-around`}
            style={{
              fontSize: `${handout.title.title_font_size.value}px`,
              lineHeight: `${handout.title.line_height.value}em`,
              marginTop: `${handout.title.top_margin.value}px`,
              marginBottom: `${handout.title.bottom_margin.value}px`,
            }}
          >
            {handout.title.title.value}
          </span>
        </div>

        {!handout.banner_texts.hide_top_banner_border.value && (
          <hr className="border-solid border-2 border-gray-600" />
        )}

        <div id="banner_texts" className="flex justify-between py-2">
          <label
            style={{
              fontSize: `${handout.banner_texts.banner_size.value}px`,
            }}
            className={`text-left text-gray-800 font-bold font-serif w-4/12 ${handout.banner_texts.banner_font.value}`}
          >
            {handout.banner_texts.banner_text_1.value}
          </label>

          <label
            style={{
              fontSize: `${handout.banner_texts.banner_size.value}px`,
            }}
            className={`text-center text-gray-800 font-bold font-serif w-4/12 ${handout.banner_texts.banner_font.value}`}
          >
            {handout.banner_texts.banner_text_2.value}
          </label>

          <label
            style={{
              fontSize: `${handout.banner_texts.banner_size.value}px`,
            }}
            className={`text-right text-gray-800 font-bold font-serif w-4/12 ${handout.banner_texts.banner_font.value}`}
          >
            {handout.banner_texts.banner_text_3.value}
          </label>
        </div>

        {!handout.banner_texts.hide_bottom_banner_border.value && (
          <hr className="border-solid border-2 border-gray-600" />
        )}

        <span
          id="headline"
          className={`${handout.headline.headline_font.value} font-semibold whitespace-pre-line block text-center`}
          style={{
            textWrap: "balance",
            fontSize: `${handout.headline.headline_font_size.value}px`,
          }}
        >
          {handout.headline.headline.value}
        </span>

        <hr className="border-solid border-4 border-gray-800 my-4" />

        {(handout.quote.quote.value as string) !== "" && (
          <p
            id="quote"
            style={{
              fontSize: `${handout.quote.quote_font_size.value}px`,
            }}
            className={`font-serif font-bold text-justify italic my-4 ${handout.quote.quote_font.value}`}
          >
            {handout.quote.quote.value}
          </p>
        )}

        <div id="main_copy">
          <Markdown
            className={classNames(
              `text-justify font-serif copy-markdown column-count-${handout.main_copy.main_copy_columns.value} ${handout.main_copy.image_filter.value}`,
              {
                blurry: handout.main_copy.is_main_copy_blurry.value,
              }
            )}
          >
            {handout.main_copy.main_copy_content.value}
          </Markdown>
        </div>
      </div>
    </React.Fragment>
  );
};

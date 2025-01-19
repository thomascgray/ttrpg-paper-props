import React from "react";
import { CHARACTER_CARD } from "../config";

export const CharacterCard = ({
  handout,
}: {
  handout: (typeof CHARACTER_CARD)["data"];
}) => {
  return (
    <>
      {/* the whole thing */}
      <div
        style={{
          width: `${handout.page_width.value}px`,
          boxShadow: `${
            handout.is_paper_shadow.value ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${handout.positioning.y_offset.value}%`,
          marginLeft: `${handout.positioning.x_offset.value}%`,
        }}
        className={`inline-block overflow-visible ${handout.font.value} ${handout.font_weight.value} ${handout.image_filter.value} paper-${handout.paper_texture.value}`}
      >
        <img
          className=""
          src={handout.image_url.value}
          style={{
            mixBlendMode: "multiply",
            margin: "10%",
            marginBottom: "6%",
            width: "calc(100% - 20%)",
          }}
        />

        <div
          className={`${handout.text_align.value} ${handout.ink_color.value} space-y-2`}
          style={{
            marginBottom: "6%",
          }}
        >
          {(handout.text_line_one.value as string) !== "" && (
            <span
              id="text_line_one"
              className={`font-black`}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.font_size.value * 2.5}px`,
              }}
            >
              {handout.text_line_one.value}
            </span>
          )}
          {(handout.text_line_two.value as string) !== "" && (
            <span
              id="text_line_two"
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.font_size.value * 1.5}px`,
              }}
            >
              {handout.text_line_two.value}
            </span>
          )}
          {(handout.text_line_three.value as string) !== "" && (
            <span
              id="text_line_three"
              className={`italic text-gray-700 `}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.font_size.value}px`,
              }}
            >
              {handout.text_line_three.value}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

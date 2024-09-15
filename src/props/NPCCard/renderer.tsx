import React from "react";
import { PAPER_TYPES } from "../../config";

export const NPCCard = (props: (typeof PAPER_TYPES)["NPC_CARD"]["data"]) => {
  return (
    <>
      {/* the whole thing */}
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom}) translateZ(0)`,
          width: `${props.page_width}px`,
          boxShadow: `${
            props.is_paper_shadow ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${props.y_offset}%`,
          marginLeft: `${props.x_offset}%`,
        }}
        className={`inline-block ${props.font} ${props.font_weight} ${props.image_filter} paper-${props.paper_texture} overflow-hidden`}
      >
        <img
          className=""
          src={props.image_url}
          style={{
            margin: "10%",
            marginBottom: "6%",
            width: "calc(100% - 20%)",
            border: `${props.image_border}`,
          }}
        />

        <div
          className={`${props.text_alignment} ${props.ink_color} space-y-2`}
          style={{
            marginBottom: "6%",
          }}
        >
          {props.text_line_one !== "" && (
            <span
              className={`font-black text-2xl `}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              {props.text_line_one}
            </span>
          )}
          {props.text_line_two !== "" && (
            <span
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              {props.text_line_two}
            </span>
          )}
          {props.text_line_three !== "" && (
            <span
              className={`italic text-gray-700 `}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              {props.text_line_three}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

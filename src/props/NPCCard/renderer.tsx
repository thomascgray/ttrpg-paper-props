import React from "react";
import { PAPER_TYPES } from "../../config";

export const NPCCard = (props: typeof PAPER_TYPES["NPC_CARD"]["data"]) => {
  return (
    <div className="relative mx-auto flex justify-around mt-10">
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom}) translateZ(0)`,
          width: `${props.page_width}px`,
        }}
        className={`inline-block ${props.font} ${props.font_weight} ${props.image_filter} absolute transition paper-${props.paper_texture} overflow-hidden transform mx-auto`}
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
    </div>
  );
};

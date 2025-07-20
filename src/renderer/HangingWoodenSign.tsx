import React from "react";
import Markdown from "react-markdown";
import {
  BookCoverConfig,
  ExtractConfigValues,
  HangingWoodenSignConfig,
} from "../db";

type HangingWoodenSignData = ExtractConfigValues<
  typeof HangingWoodenSignConfig
>;

export const HangingWoodenSign = ({
  handout,
}: {
  handout: HangingWoodenSignData;
}) => {
  return (
    <div
      //   style={{
      //     marginTop: `${handout.positioning.yOffset}%`,
      //     marginLeft: `${handout.positioning.xOffset}%`,
      //   }}
      className="relative"
    >
      <div className={`image-wrapper`}>
        <img
          src={"/images/wooden_signs/hanging.webp"}
          alt="The book cover"
          width={700}
        />
      </div>

      <div
        id="main_copy"
        style={{
          position: "absolute",
          top: "250px",
          left: "200px",
          fontSize: "80px",
          color: "#aaa",
          textShadow: "1px 1px 0px #555, -1px -1px 1px #222",
          //   textShadow:
          //     "-1px -1px 1px rgba(255,255,255,0.2), 1px 1px 1px rgba(0,0,0,0.6);",

          mixBlendMode: "multiply",
          fontWeight: "700",
        }}
        // style={{
        //   fontSize: `${handout.fontSize}px`,
        //   marginLeft: `${handout.textLeftMargin}px`,
        //   width: "80%",
        // }}
        // className={`absolute ${handout.textEffect} ${handout.font} ${handout.fontWeight} top-[2em] left-[2em]`}
      >
        <Markdown
        //   className={`block copy-markdown ${handout.inkColor} ${handout.textAlign}`}
        >
          {handout.text}
        </Markdown>
      </div>
    </div>
  );
};

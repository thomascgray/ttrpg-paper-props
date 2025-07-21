import React from "react";
import Markdown from "react-markdown";
import { LabelledLiquidConfig, ExtractConfigValues } from "../db";

type LabelledLiquidData = ExtractConfigValues<typeof LabelledLiquidConfig>;

export const LabelledLiquid = ({
  handout,
}: {
  handout: LabelledLiquidData;
}) => {
  return (
    <div
      style={{
        marginTop: `${handout.positioning.yOffset}%`,
        marginLeft: `${handout.positioning.xOffset}%`,
      }}
      className="relative transition-all"
    >
      <img
        className="transition-all"
        src={handout.imageTemplate}
        alt="The labelled liquid container"
        style={{
          width: `${handout.imageWidth}px`,
          transform: `rotate(${handout.imageRotation}deg)`,
          filter: `hue-rotate(${handout.imageHueFilter}deg)`,
        }}
      />

      <div
        id="main_copy"
        style={{
          fontSize: `${handout.fontSize}px`,
          marginLeft: `${handout.textLeftMargin}px`,
          marginTop: `${handout.textTopMargin}%`,
          width: `${handout.textWidth}%`,
          transform: `rotate(${handout.textRotation}deg)`,
        }}
        className={`absolute ${handout.textEffect} ${handout.font} ${handout.fontWeight} top-[2em] left-[2em] transition-all`}
      >
        <Markdown
          className={`block copy-markdown ${handout.inkColor} ${handout.textAlign}`}
        >
          {handout.mainCopy}
        </Markdown>
      </div>
    </div>
  );
};

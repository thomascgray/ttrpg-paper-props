import React from "react";
import Markdown from "react-markdown";
import { LabelledLiquidConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type LabelledLiquidData = ExtractConfigValues<typeof LabelledLiquidConfig>;

export const LabelledLiquid = ({
  handout,
}: {
  handout: LabelledLiquidData;
}) => {
  return (
    <div className="relative">
      <img
        className=""
        src={handout.imageTemplate}
        alt="The labelled liquid container"
        style={{
          width: `${handout.imageWidth}cqw`,
          transform: `rotate(${handout.imageRotation}deg)`,
          filter: `hue-rotate(${handout.imageHueFilter}deg)`,
        }}
      />

      <div
        id="main_copy"
        style={{
          fontSize: `${handout.fontSize}cqw`,
          marginLeft: `${handout.textLeftMargin}cqw`,
          marginTop: `${handout.textTopMargin}%`,
          width: `${handout.textWidth}%`,
          transform: `rotate(${handout.textRotation}deg)`,
        }}
        className={`absolute ${handout.textEffect} ${handout.font} ${handout.fontWeight} top-[2em] left-[2em] `}
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

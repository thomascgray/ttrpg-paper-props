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
    <div
      className="relative max-w-[60cqw] lg:max-w-[30em]"
      style={{
        width: `${handout.imageWidth}cqw`,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div className="relative w-full">
          <img
            className="w-full h-auto"
            src={handout.imageTemplate}
            alt="The labelled liquid container"
            style={{
              transform: `rotate(${handout.imageRotation}deg)`,
              filter: `hue-rotate(${handout.imageHueFilter}deg)`,
            }}
          />

          <div
            id="main_copy"
            style={{
              top: `${
                105 + parseInt(handout.textTopMargin as unknown as string)
              }cqw`,
              left: `${
                50 + parseInt(handout.textLeftMargin as unknown as string)
              }cqw`,
              fontSize: `${handout.fontSize}cqw`,
              width: `${handout.textWidth}cqw`,
              transform: `translate(-50%, -50%) rotate(${handout.textRotation}deg)`,
            }}
            className={`absolute ${handout.textEffect} ${handout.font} ${handout.fontWeight}`}
          >
            <Markdown
              className={`block  copy-markdown ${handout.inkColor} ${handout.textAlign}`}
            >
              {handout.mainCopy}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

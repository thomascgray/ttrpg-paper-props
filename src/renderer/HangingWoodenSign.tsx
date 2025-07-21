import React from "react";
import Markdown from "react-markdown";
import {
  BookCoverConfig,
  ExtractConfigValues,
  HangingWoodenSignConfig,
} from "../db";
import classNames from "classnames";

type HangingWoodenSignData = ExtractConfigValues<
  typeof HangingWoodenSignConfig
>;

const imageOriginalWidth = 700;

export const HangingWoodenSign = ({
  handout,
}: {
  handout: HangingWoodenSignData;
}) => {
  return (
    <div
      className="relative transition-all flex justify-around"
      style={{
        width: `calc(${imageOriginalWidth}px * ${handout.image.scaleX})`,
      }}
    >
      <div className={`image-wrapper`}>
        <img
          src={"/images/wooden_signs/hanging.webp"}
          alt="The book cover"
          width={`${imageOriginalWidth}px`}
          style={{
            filter: `hue-rotate(${handout.image.hue_rotation}deg) saturate(${handout.image.saturation}%) brightness(${handout.image.brightness}%)`,
            transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
          }}
        />
      </div>

      <div
        id="main_copy"
        style={{
          marginTop: `${handout.yOffset}px`,
          width: "90%",
          top: `${170}px`,
          fontSize: `${handout.fontSize}px`,
          lineHeight: `${handout.fontSize}px`,
        }}
        className={classNames(
          `absolute transition-all engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
          {
            "rough-edges": handout.gnarledText,
          }
        )}
      >
        <Markdown>{handout.text}</Markdown>
      </div>
    </div>
  );
};

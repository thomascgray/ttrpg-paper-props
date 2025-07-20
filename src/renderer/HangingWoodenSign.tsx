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

export const HangingWoodenSign = ({
  handout,
}: {
  handout: HangingWoodenSignData;
}) => {
  const top = 200 + parseInt(handout.positioning.yOffset as unknown as string);
  const left = 200 + parseInt(handout.positioning.xOffset as unknown as string);

  return (
    <div className="relative transition-all">
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
          top: `${top}px`,
          left: `${left}px`,
          fontSize: `${handout.fontSize}px`,
        }}
        className={classNames(
          `absolute transition-all engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight}`,
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

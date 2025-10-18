import Markdown from "react-markdown";
import { HangingWoodenSignConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import classNames from "classnames";
import { getImageProcessingStyles } from "../utils";

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
      className="relative  flex justify-around max-w-[80em]"
      style={{
        width: `${handout.dimensions.pageWidth}cqw`,
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
            src={"/images/wooden_signs/hanging.webp"}
            alt="Hanging wooden sign"
            className="w-full h-auto"
            style={{
              transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
              ...getImageProcessingStyles(handout.image),
            }}
          />

          <div
            id="main_copy"
            style={{
              top: `${
                handout.textPosition.top + handout.textPosition.yOffset
              }cqw`,
              fontSize: `${handout.fontSize}cqw`,
              lineHeight: `${handout.fontSize}cqw`,
              width: "90%",
            }}
            className={classNames(
              `absolute  engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
              {
                "rough-edges": handout.gnarledText,
              }
            )}
          >
            <Markdown>{handout.text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

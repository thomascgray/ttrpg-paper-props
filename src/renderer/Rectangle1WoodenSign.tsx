import Markdown from "react-markdown";
import { Rectangle1WoodenSignConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import classNames from "classnames";
import { getImageProcessingStyles } from "../utils";

type Rectangle1WoodenSignData = ExtractConfigValues<
  typeof Rectangle1WoodenSignConfig
>;

export const Rectangle1WoodenSign = ({
  handout,
}: {
  handout: Rectangle1WoodenSignData;
}) => {
  return (
    <div
      className="relative flex justify-around max-w-[80em]"
      style={{
        width: `${handout.handoutWidth}cqw`,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div
          className="relative w-full"
          style={{
            perspective: "500px",
          }}
        >
          <img
            src={"/images/wooden_signs/sign post a.webp"}
            alt="Rectangular wooden sign"
            className="w-full h-auto"
            style={{
              transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
              ...getImageProcessingStyles(handout.image),
            }}
          />

          <div
            id="main_copy"
            style={{
              top: `${handout.textYOffset}cqw`,
              left: `${handout.textXOffset}cqw`,
              fontSize: `${handout.fontSize}cqw`,
              lineHeight: `${handout.fontSize}cqw`,
              width: "83%",
              transform: `translateX(13cqw) rotateX(0deg) rotateY(13deg) rotateZ(0deg)`,
            }}
            className={classNames(
              `absolute engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
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

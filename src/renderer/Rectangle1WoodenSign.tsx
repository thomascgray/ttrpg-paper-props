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
        className="w-full h-full relative"
        style={{
          containerType: "inline-size",
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
          style={{
            perspective: "200px",
            // transform: `translateY(${handout.textYOffset}em)`,
          }}
          className="absolute engraved-text top-0 left-0 w-full h-full"
        >
          {/* put the y offset on a wrapper */}
          <div
            id="main_copy"
            style={{
              top: `${
                45 + parseFloat(handout.textYOffset as unknown as string)
              }%`,
              // left: `${
              //   -2 + parseInt(handout.textXOffset as unknown as string)
              // }cqw`,

              fontSize: `${handout.fontSize}cqw`,
              // lineHeight: `${handout.fontSize}cqw`,
              width: "83%",
              transform: `translateX(13cqw) rotateX(0deg) rotateY(15deg) rotateZ(0deg)`,
            }}
            className={classNames(
              `absolute origin-top-left bg-red-500 engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
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

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
          // perspective: "00px",
          perspective: "25cqmin",

          maxWidth: `40rem`,
        }}
      >
        <img
          src={"/images/wooden_signs/sign post a.webp"}
          alt="Rectangular wooden sign"
          className="w-full h-auto"
          style={{
            transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
            maxWidth: `40rem`,
            ...getImageProcessingStyles(handout.image),
          }}
        />

        <div
          id="main_copy"
          style={{
            fontSize: `${handout.fontSize}cqw`,
            width: "83%",
            position: "absolute",
            top: `${
              40 + parseInt(handout.textYOffset as unknown as string)
            }cqmin`,
            // left: "14cqmin",
            left: `${
              14 + parseInt(handout.textXOffset as unknown as string)
            }cqmin`,
            transform: `rotateX(0deg) rotateY(8deg) rotateZ(0deg)`,
          }}
          className={classNames(
            `absolute origin-top-left  engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
            {
              "rough-edges": handout.gnarledText,
            }
          )}
        >
          <Markdown>{handout.text}</Markdown>
        </div>
      </div>
    </div>
  );
};

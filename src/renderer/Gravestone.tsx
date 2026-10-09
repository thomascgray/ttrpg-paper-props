import Markdown from "react-markdown";
import { GravestoneConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import classNames from "classnames";
import { getImageProcessingStyles } from "../utils";

type GravestoneData = ExtractConfigValues<typeof GravestoneConfig>;

export const Gravestone = ({ handout }: { handout: GravestoneData }) => {
  return (
    <div
      className="relative flex justify-around max-w-[80em]"
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
            src={handout.stoneImage}
            alt="Gravestone"
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
                30 + parseInt(handout.textYOffset as unknown as string)
              }cqw`,
              left: `${
                50 + parseInt(handout.textXOffset as unknown as string)
              }%`,
              transform: "translateX(-50%)",
              fontSize: `${handout.fontSize}cqw`,
              lineHeight: `${handout.fontSize * 1.2}cqw`,
              width: `${handout.textWidth}%`,
            }}
            className={classNames(
              `absolute engraved-text ${handout.textAlign} ${handout.font} ${handout.fontWeight} copy-markdown list-inside list-disc`,
              {
                "rough-edges": handout.gnarledText,
              },
            )}
          >
            <Markdown>{handout.text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

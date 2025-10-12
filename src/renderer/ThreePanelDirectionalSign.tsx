import React from "react";
import Markdown from "react-markdown";
import { ThreePanelDirectionalSignConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import classNames from "classnames";
import { getImageProcessingStyles } from "../utils";

type ThreePanelDirectionalSignData = ExtractConfigValues<
  typeof ThreePanelDirectionalSignConfig
>;

export const ThreePanelDirectionalSign = ({
  handout,
}: {
  handout: ThreePanelDirectionalSignData;
}) => {
  const panel1TranslateX = 2 + handout.panel1.xOffset;
  const panel2TranslateX = 2 + handout.panel2.xOffset;
  const panel3TranslateX = 2 + handout.panel3.xOffset;

  return (
    <div
      className="relative transition-all max-w-[80em]"
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
            src={"/images/wooden_signs/direction_3_a.webp"}
            alt="Three panel directional wooden sign"
            className="w-full h-auto"
            style={{
              transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
              ...getImageProcessingStyles(handout.image),
            }}
          />

          <div
            id="panel1_text"
            style={{
              top: `${25.3 + handout.panel1.yOffset}cqw`,
              left: `7.8cqw`,
              fontSize: `${handout.panel1.fontSize}cqw`,
              transform: `rotateZ(-7deg) rotateY(55deg) translateX(${panel1TranslateX}cqw) translateY(-50%)`,
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
            className={classNames(
              `absolute transition-all engraved-text ${handout.panel1.font} ${handout.panel1.fontWeight}`,
              {
                "rough-edges": handout.panel1.gnarledText,
              }
            )}
          >
            <Markdown>{handout.panel1.text}</Markdown>
          </div>

          <div
            id="panel2_text"
            style={{
              top: `${20.4 + handout.panel2.yOffset}cqw`,
              left: `53.6cqw`,
              fontSize: `${handout.panel2.fontSize}cqw`,
              lineHeight: `${handout.panel2.fontSize}cqw`,
              transform: `rotateZ(-7deg) rotateY(55deg) translateX(${panel2TranslateX}cqw) translateY(-50%)`,
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
            className={classNames(
              `absolute transition-all engraved-text ${handout.panel2.font} ${handout.panel2.fontWeight}`,
              {
                "rough-edges": handout.panel2.gnarledText,
              }
            )}
          >
            <Markdown>{handout.panel2.text}</Markdown>
          </div>

          <div
            id="panel3_text"
            style={{
              top: `${38.6 + handout.panel3.yOffset}cqw`,
              left: `53.6cqw`,
              fontSize: `${handout.panel3.fontSize}cqw`,
              lineHeight: `${handout.panel3.fontSize}cqw`,
              transform: `rotateZ(15deg) rotateY(-55deg) translateX(${panel3TranslateX}cqw) translateY(-50%) skewX(22deg)`,
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
              width: "20em",
            }}
            className={classNames(
              `absolute transition-all engraved-text ${handout.panel3.font} ${handout.panel3.fontWeight}`,
              {
                "rough-edges": handout.panel3.gnarledText,
              }
            )}
          >
            <Markdown>{handout.panel3.text}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

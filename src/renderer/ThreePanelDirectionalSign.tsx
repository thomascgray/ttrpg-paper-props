import React from "react";
import Markdown from "react-markdown";
import { ThreePanelDirectionalSignConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import classNames from "classnames";

type ThreePanelDirectionalSignData = ExtractConfigValues<
  typeof ThreePanelDirectionalSignConfig
>;

export const ThreePanelDirectionalSign = ({
  handout,
}: {
  handout: ThreePanelDirectionalSignData;
}) => {
  const panel1TranslateX =
    14 + parseInt(handout.panel1.xOffset as unknown as string);
  const panel2TranslateX =
    14 + parseInt(handout.panel2.xOffset as unknown as string);

  const panel3TranslateX =
    14 + parseInt(handout.panel3.xOffset as unknown as string);

  return (
    <div className="relative transition-all">
      <div className={`image-wrapper`}>
        <img
          src={"/images/wooden_signs/direction_3_a.webp"}
          alt="Three panel directional wooden sign"
          width={700}
          style={{
            filter: `hue-rotate(${handout.image.hue_rotation}deg) saturate(${handout.image.saturation}%) brightness(${handout.image.brightness}%)`,
          }}
        />
      </div>

      <div
        id="panel1_text"
        style={{
          top: `${
            177 + parseInt(handout.panel1.yOffset as unknown as string)
          }px`,
          left: `${55}px`,
          fontSize: `${handout.panel1.fontSize}px`,
          transform: `rotateZ(-7deg) rotateY(55deg) translateX(${panel1TranslateX}px) translateY(-50%)`,
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
          top: `${
            143 + parseInt(handout.panel2.yOffset as unknown as string)
          }px`,
          left: `${375}px`,
          fontSize: `${handout.panel2.fontSize}px`,
          lineHeight: `${handout.panel2.fontSize}px`,
          transform: `rotateZ(-7deg) rotateY(55deg) translateX(${panel2TranslateX}px) translateY(-50%)`,
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
          top: `${
            270 + parseInt(handout.panel3.yOffset as unknown as string)
          }px`,
          left: `${375}px`,
          fontSize: `${handout.panel3.fontSize}px`,
          lineHeight: `${handout.panel3.fontSize}px`,
          transform: `rotateZ(15deg) rotateY(-55deg) translateX(${panel3TranslateX}px) translateY(-50%) skewX(22deg)`,
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
  );
};

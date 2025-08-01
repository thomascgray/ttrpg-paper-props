import React from "react";
import { CrystalBallConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { Bulges } from "../svg_effects/Bulge";
import { detectBrowser } from "../utils";

type CrystalBallData = ExtractConfigValues<typeof CrystalBallConfig>;

export const CrystalBall: React.FC<{ handout: CrystalBallData }> = ({
  handout,
}) => {
  const { image } = handout;

  return (
    <>
      {/* <BulgeInnerCircle scale={handout.bulgeScale} /> */}
      <Bulges scale={handout.bulgeScale * 2} />

      <div>
        {image && (
          <img
            src={image}
            style={
              {
                // transform: "translateX(-50%)",
              }
            }
            alt="Crystal ball vision"
            className="w-full h-full object-cover aspect-square bulge-whole-element"
          />
        )}
      </div>
    </>
  );
};

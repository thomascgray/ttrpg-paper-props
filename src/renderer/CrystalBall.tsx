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

      <div className="relative">
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
              className="w-full h-full max-w-[500px] object-cover aspect-square rounded-full bulge-inner-circle"
            />
          )}
        </div>

        {/* glare lights */}
        <div
          style={{
            mixBlendMode: "soft-light",
          }}
          className="absolute top-0 left-0 w-full h-full rounded-full aspect-square bulge-inner-circle"
        >
          <span className="glare-1 absolute top-[100px] left-[50px] w-[50px] h-[100px] bg-[white] "></span>
          <span className="glare-1 absolute top-[250px] left-[50px] w-[50px] h-[100px] bg-[white] "></span>
        </div>

        <div
          style={{
            mixBlendMode: "hard-light",
            background:
              "radial-gradient(at 10% 10%,rgba(255, 255, 255, 1) 10%, rgba(0, 0, 0, 1) 80%)",
          }}
          className="absolute top-0 left-0 w-full h-full rounded-full aspect-square bulge-inner-circle bg-gradient-to-r from-cyan-500 to-blue-500"
        ></div>
      </div>
    </>
  );
};

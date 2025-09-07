import React from "react";
import { CrystalBallConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { Bulges } from "../svg_effects/Bulge";
import { getImageProcessingStyles } from "../utils";

type CrystalBallData = ExtractConfigValues<typeof CrystalBallConfig>;

export const CrystalBall: React.FC<{ handout: CrystalBallData }> = ({
  handout,
}) => {
  const {
    image,
    positioning,
    showGlare,
    showDirectionalLight,
    showShadowOnStand,
  } = handout;

  return (
    <div className="relative">
      <Bulges id="crystal-ball" scale={120} />
      <Bulges id="crystal-ball-bigger" scale={450} />

      {image && (
        <div className="relative min-w-[100%]">
          <div className="min-w-full">
            {image && (
              <img
                src={image}
                style={{
                  ...getImageProcessingStyles({
                    ...handout.imagePostProcessing,
                    filterUrl: "crystal-ball-bulge-inner-circle",
                  }),
                }}
                alt="Crystal ball vision"
                className="w-full h-full max-w-[500px] min-w-[500px] object-cover aspect-square rounded-full"
              />
            )}
          </div>

          {/* glare lights */}
          {showGlare && (
            <div
              className="glare-light absolute top-0 left-0 w-full h-full rounded-full aspect-square"
              style={{
                mixBlendMode: "hard-light",
                filter: `url(#crystal-ball-bigger-bulge-inner-circle)`,
              }}
            >
              <span className="glare absolute top-[100px] left-[90px] w-[50px] h-[100px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>
              <span className="glare absolute top-[250px] left-[90px] w-[50px] h-[100px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>

              <span className="glare absolute top-[150px] right-[100px] w-[15px] h-[100px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>
              <span className="glare absolute top-[150px] right-[120px] w-[15px] h-[100px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>

              <span className="glare absolute bottom-[130px] left-[160px] w-[250px] h-[10px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>
              <span className="glare absolute bottom-[145px] left-[150px] w-[250px] h-[10px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>
              <span className="glare absolute bottom-[160px] left-[140px] w-[250px] h-[10px] bg-[#eeeeee] opacity-60 blur-[2px]"></span>
            </div>
          )}

          {/* direction light */}
          {showDirectionalLight && (
            <div
              className="directional-light absolute top-0 left-0 w-full h-full rounded-full aspect-square"
              style={{
                mixBlendMode: "hard-light",
                filter: `url(#crystal-ball-bulge-inner-circle)`,
                background:
                  "radial-gradient(at 10% 10%,rgba(255, 255, 255, 1) 10%, rgba(0, 0, 0, 1) 80%)",
              }}
            ></div>
          )}
        </div>
      )}

      <img
        className="crystal-ball-stand absolute"
        style={{
          transform: `translate(50px, -30px) scale(${1.3})`,
          ...(showShadowOnStand && {
            filter: "drop-shadow(5px 5px 13px #000000)",
          }),
        }}
        src="/images/crystal_ball/stand1.webp"
        alt="Crystal ball stand"
      />
    </div>
  );
};

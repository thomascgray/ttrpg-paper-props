import React from "react";
import { TallVertical1FlagConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type TallVertical1FlagData = ExtractConfigValues<
  typeof TallVertical1FlagConfig
>;

export const TallVertical1Flag = ({
  handout,
}: {
  handout: TallVertical1FlagData;
}) => {
  const actualZoom = handout.zoom - 100;
  console.log("actualZoom", actualZoom);
  // then we half that, and apply half to the left and add half to the width
  const leftToApply = (actualZoom / 2) * -1 + handout.offset.x;
  const topToApply = (actualZoom / 2) * -1 + handout.offset.y;
  const widthToApply = actualZoom;
  const heightToApply = actualZoom;

  return (
    <div
      className="relative flex justify-around"
      style={{
        width: `${handout.dimensions.pageWidth}cqw`,
        containerType: "inline-size",
      }}
    >
      <div className="relative w-full max-w-[15em]">
        {/* Base flag image */}
        <img
          id="template-flag"
          src="/images/flags/tall_vertical_1.png"
          alt="Tall vertical flag"
          className="w-full h-auto"
          style={{
            // maxHeight: "calc(100vh - 8rem)",
            objectFit: "contain",
          }}
        />

        {/* this has the mask so it catches and clips the background */}
        <div
          id="template-flag-mask"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            perspective: "500px",
            perspectiveOrigin: "left bottom",
            // background: "red",
            // mixBlendMode: "overlay",
            maskImage: `url(/images/flags/tall_vertical_1_mask.png)`,
            maskRepeat: "no-repeat",
            maskSize: "contain",
            backgroundColor: handout.flag_background_colour,
            // background: `url(${handout.overlayImage})`,
            // transform: `rotateX(0deg) rotateY(-45deg) rotateZ(0deg)`,
          }}
        >
          {/* this has the actual overlay */}
          <div
            style={{
              position: "absolute",
              top: `${2 + topToApply}%`,
              left: `${leftToApply}%`,
              width: `${90 + widthToApply}%`,
              height: `${75 + heightToApply}%`,
              backgroundImage: `url(${handout.overlayImage})`,
              transform: `rotateX(5deg) rotateY(-20deg) rotateZ(${handout.rotation}deg)`,
              backgroundSize: `100% 100%`,
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

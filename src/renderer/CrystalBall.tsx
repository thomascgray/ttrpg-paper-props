import React from "react";
import { CrystalBallConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type CrystalBallData = ExtractConfigValues<typeof CrystalBallConfig>;

export const CrystalBall: React.FC<{ handout: CrystalBallData }> = ({
  handout,
}) => {
  const { image } = handout;

  return (
    <div className="pt-[100px]">
      <img src="https://placecats.com/200/200" className="bulge-weak" />
      <br />
      <br />
      <img src="https://placecats.com/300/301" className="bulge-weak" />
      <br />
      <br />
      <img src="https://placecats.com/400/400" className="bulge-weak" />
      {/* <div className="w-[500px] h-[500px] rounded-full bg-red-500 bulge-weak"></div> */}
      {/* {image && (
        <img
          src={image}
          style={
            {
              // transform: "translateX(-50%)",
            }
          }
          alt="Crystal ball vision"
          className="w-full h-full object-cover aspect-square bulge-weak"
        />
      )} */}
      {/* <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bulgeGrad">
            <stop offset="0%" stop-color="rgb(128,128,128)" />
            <stop offset="100%" stop-color="rgb(200,200,128)" />
          </radialGradient>
        </defs>
        <rect width="128" height="128" fill="url(#bulgeGrad)" />
      </svg> */}
      {/* </div> */}
    </div>
  );
};

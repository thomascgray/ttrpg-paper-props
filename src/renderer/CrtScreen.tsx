import { CrtScreenConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import Markdown from "react-markdown";
import {
  getImageProcessingStyles,
  getRawColourForInkColor,
  saturateHexColor,
} from "../utils";
import classNames from "classnames";
type PlainLetterData = ExtractConfigValues<typeof CrtScreenConfig>;

export const CrtScreen = ({ handout }: { handout: PlainLetterData }) => {
  // the text needs different "base" offsets depending on the image
  let textRenderOpts = {
    top: 160,
    left: 135,
    transformString: ``,
  };

  let blackSquareOpts = {
    top: 110,
    left: 100,
    width: 650,
    height: 450,
  };

  switch (handout.crtScreen) {
    case "/images/crts/a.webp": // the hp
      break;
    case "/images/crts/b.webp": // the mac
      break;
    case "/images/crts/c.webp": // the commodore pet
      textRenderOpts.transformString = `scaleX(0.6)
scaleY(0.6)
rotateX(-8deg)
rotateY(-16deg)
rotateZ(1deg)
translateX(230px)
translateY(-240px)
translateZ(00px)`;
      break;
    case "/images/crts/d.webp": // the commodore pet
      blackSquareOpts.top = 50;
      blackSquareOpts.left = 100;
      blackSquareOpts.width = 500;
      blackSquareOpts.height = 250;
      textRenderOpts.transformString = `scaleX(0.63) scaleY(0.61)
translateX(-148px)
translateY(-245px)
translateZ(00px)`;
      break;
    case "/images/crts/e.webp": // micral microcomputer
      blackSquareOpts.top = 100;
      blackSquareOpts.left = 300;
      blackSquareOpts.width = 500;
      blackSquareOpts.height = 500;
      textRenderOpts.transformString = `scaleX(0.65)
scaleY(0.7)
rotateX(-10deg)
rotateY(-21deg)
rotateZ(-8deg)
translateX(283px)
translateY(-74px)
translateZ(0px)
skewY(-1deg)`;
      break;
  }

  return (
    <div className="relative">
      {/* the black box that covers up the gaps between the text render and the image */}
      <div
        style={{
          top: `${blackSquareOpts.top}px`,
          left: `${blackSquareOpts.left}px`,
          width: `${blackSquareOpts.width}px`,
          height: `${blackSquareOpts.height}px`,
        }}
        className={classNames("black-screen absolute bg-[#191919]", {
          hidden: handout.crtScreen === "/images/crts/c.webp",
        })}
      ></div>

      {/* the actual image */}
      <div className="image-wrapper">
        <img
          style={{
            transformOrigin: "top left",
            transform: "scaleX(1.1)",
            ...getImageProcessingStyles(handout.imagePostProcessing),
          }}
          src={handout.crtScreen}
          alt="CRT Screen"
        />
      </div>

      {/* the text render */}
      <div
        style={{
          top: `${textRenderOpts.top}px`,
          left: `${textRenderOpts.left}px`,
          transform: `${textRenderOpts.transformString}`,
          transformOrigin: "center",
        }}
        className="absolute top-0 left-0 font-mono bg-[#232323] crt w-[550px] h-[350px] bulge-filter overflow-y-clip"
      >
        <div
          className="w-full h-[95%] overflow-y-clip"
          style={{
            color: handout.crtPixelColor,
            borderColor: handout.crtPixelColor,
            textShadow: handout.textGlow
              ? `0px 0px 15px ${handout.crtPixelColor}`
              : "",
            fontSize: `${handout.fontSize}px`,
          }}
        >
          <Markdown
            className={`block copy-markdown ${handout.textAlign} ${handout.fontWeight} `}
          >
            {handout.text}
          </Markdown>
        </div>
      </div>

      {/* the scan lines */}
      <div
        style={{
          top: `${textRenderOpts.top}px`,
          left: `${textRenderOpts.left}px`,
          transform: `${textRenderOpts.transformString}`,
          transformOrigin: "center",
        }}
        className="absolute opacity-20 top-0 left-0 horizontal-lines w-[550px] h-[350px] bulge-filter overflow-y-clip"
      ></div>
    </div>
  );
};

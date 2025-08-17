import { CrtScreenConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import Markdown from "react-markdown";
import {
  getImageProcessingStyles,
  getRawColourForInkColor,
  saturateHexColor,
} from "../utils";
import classNames from "classnames";
import { Bulges } from "../svg_effects/Bulge";
import { text } from "../inputHelpers";
type PlainLetterData = ExtractConfigValues<typeof CrtScreenConfig>;

export const CrtScreen = ({ handout }: { handout: PlainLetterData }) => {
  // the text needs different "base" offsets depending on the image
  let textRenderOpts = {
    top: 160,
    left: 145,
    transformString: ``,
    width: "70%",
    height: "34%",
    bulgeScale: 120,
    perspective: undefined as string | undefined,
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
      textRenderOpts.transformString = `
scale(0.6)
rotateX(-8deg)
rotateY(-16deg)
rotateZ(1deg)
translateX(43%)
translateY(-70%)
translateZ(00px)`;
      textRenderOpts.width = "58%";
      textRenderOpts.height = "42%";
      textRenderOpts.top = 160;
      textRenderOpts.bulgeScale = 135;
      break;
    case "/images/crts/d.webp": // the commodore pet
      blackSquareOpts.top = 50;
      blackSquareOpts.left = 100;
      blackSquareOpts.width = 500;
      blackSquareOpts.height = 250;
      textRenderOpts.width = "62%";
      textRenderOpts.height = "50%";
      textRenderOpts.transformString = `scale(0.65)
translateX(-115px)
translateY(-180px)
translateZ(00px)`;
      break;
    case "/images/crts/e.webp": // micral microcomputer
      blackSquareOpts.top = 100;
      blackSquareOpts.left = 300;
      blackSquareOpts.width = 500;
      blackSquareOpts.height = 500;
      textRenderOpts.width = "41.5%";
      textRenderOpts.height = "39%";
      textRenderOpts.bulgeScale = 140;
      textRenderOpts.perspective = "1000px";
      textRenderOpts.transformString = `scale(0.8)
rotateX(-7deg) 
rotateY(12deg) 
rotateZ(-5deg) 
translateX(305px) 
translateY(-20px) 
translateZ(0px)`;
      break;
  }

  return (
    <>
      <Bulges id="crt" scale={textRenderOpts.bulgeScale} />
      <div
        className="relative"
        style={{
          perspective: textRenderOpts.perspective,
        }}
      >
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

        {/* the actual image of the crt with its screen cut out */}
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
          className="text-main-wrapper absolute top-0 left-0 crt"
          style={{
            top: `${textRenderOpts.top}px`,
            left: `${textRenderOpts.left}px`,
            transform: `${textRenderOpts.transformString}`,
            transformOrigin: "center",
            width: textRenderOpts.width,
            height: textRenderOpts.height,
          }}
        >
          <div
            className="w-[100%] h-full font-mono bg-[#232323] overflow-y-clip"
            style={{
              filter: `url(#crt-bulge-whole-element)`,
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

        {/* <div
          className="text-main-wrapper absolute top-0 left-0 crt z-50"
          style={{
            top: `${textRenderOpts.top}px`,
            left: `${textRenderOpts.left}px`,
            transform: `${textRenderOpts.transformString}`,
            transformOrigin: "center",
            width: textRenderOpts.width,
            height: textRenderOpts.height,
          }}
        >
          <div className="w-[100%] h-full bulge-whole-element"></div>
        </div> */}
      </div>
    </>
  );
};

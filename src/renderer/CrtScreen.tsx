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
  // Converting original pixel values to CQW units (based on original 760px width)
  let textRenderOpts = {
    top: 21, // 160px / 760px * 100 ≈ 21cqw
    left: 19, // 145px / 760px * 100 ≈ 19cqw
    transformString: ``,
    width: "70%",
    height: "34%",
    perspective: undefined as string | undefined,
  };

  let blackSquareOpts = {
    top: 14.5, // 110px / 760px * 100 ≈ 14.5cqw
    left: 13, // 100px / 760px * 100 ≈ 13cqw
    width: 73.5, // 560px / 760px * 100 ≈ 73.5cqw
    height: 52.5, // 400px / 760px * 100 ≈ 52.5cqw
  };

  switch (handout.crtScreen) {
    case "/images/crts/a.webp": // the hp
      break;
    case "/images/crts/b.webp": // the mac
      textRenderOpts.width = "62%";
      blackSquareOpts.top = 5.5;
      blackSquareOpts.height = 80;
      break;
    case "/images/crts/c.webp": // the commodore pet
      textRenderOpts.transformString = `
scale(0.6)
rotateX(-8deg)
rotateY(-16deg)
rotateZ(1deg)
translateX(27%)
translateY(-80%)
translateZ(00px)`;
      textRenderOpts.width = "54%";
      textRenderOpts.height = "42%";
      textRenderOpts.top = 21; // 160px / 760px * 100
      break;
    case "/images/crts/d.webp": // the apple lisa 2
      blackSquareOpts.top = 6.5; // 50px / 760px * 100
      blackSquareOpts.left = 13; // 100px / 760px * 100
      blackSquareOpts.width = 65.5; // 500px / 760px * 100
      blackSquareOpts.height = 32.5; // 250px / 760px * 100
      textRenderOpts.width = "54%";
      textRenderOpts.height = "50%";
      textRenderOpts.transformString = `scale(0.65)
translateX(-15cqw)
translateY(-23.5cqw)
translateZ(00px)`;
      break;
    case "/images/crts/e.webp": // micral microcomputer
      blackSquareOpts.top = 10; // 100px / 760px * 100
      blackSquareOpts.left = 32.5; // 300px / 760px * 100
      blackSquareOpts.width = 40; // 500px / 760px * 100
      blackSquareOpts.height = 35.5; // 500px / 760px * 100
      textRenderOpts.width = "33%";
      textRenderOpts.height = "34%";
      textRenderOpts.perspective = "1000px";
      textRenderOpts.transformString = `scale(0.8)
rotateX(-7deg)
rotateY(12deg)
rotateZ(-5deg)
translateX(23cqw)
translateY(-6.5cqw)
translateZ(0px)`;
      break;
  }

  return (
    <>
      <Bulges id="crt" scale={handout.bulgeEffect} />
      <div
        className="xl:max-w-[45em] max-w-[40em]"
        style={{
          width: `${handout.dimensions.pageWidth}cqw`,
        }}
      >
        <div
          className="relative"
          style={{
            containerType: "inline-size",
          }}
        >
          <div
            className="relative"
            style={{
              perspective: textRenderOpts.perspective,
            }}
          >
            {/* the black box that covers up the gaps between the text render and the image */}
            <div
              style={{
                top: `${blackSquareOpts.top}cqw`,
                left: `${blackSquareOpts.left}cqw`,
                width: `${blackSquareOpts.width}cqw`,
                height: `${blackSquareOpts.height}cqw`,
                zIndex: 20,
              }}
              className={classNames("black-screen absolute bg-[#191919]", {
                hidden: handout.crtScreen === "/images/crts/c.webp",
              })}
            ></div>

            {/* the actual image of the crt with its screen cut out */}
            <div
              className="image-wrapper"
              style={{
                zIndex: 30,
                position: "relative",
              }}
            >
              <img
                style={{
                  width: "100%",
                  transformOrigin: "top left",
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
                top: `${textRenderOpts.top}cqw`,
                left: `${textRenderOpts.left}cqw`,
                transform: `${textRenderOpts.transformString}`,
                transformOrigin: "center",
                width: textRenderOpts.width,
                height: textRenderOpts.height,
                zIndex: 40,
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
                  fontSize: `${handout.fontSize}cqw`,
                }}
              >
                <Markdown
                  className={`block copy-markdown ${handout.textAlign} ${handout.fontWeight} `}
                >
                  {handout.text}
                </Markdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

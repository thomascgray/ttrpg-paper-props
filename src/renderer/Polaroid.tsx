import classNames from "classnames";
import { PolaroidConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba, getImageProcessingStyles } from "../utils";

type PolaroidData = ExtractConfigValues<typeof PolaroidConfig>;

export const Polaroid = ({ handout }: { handout: PolaroidData }) => {
  return (
    <div
      style={{ width: `${handout.pageWidth}cqw` }}
      className="xl:max-w-[24em] relative inline-block"
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        {handout.showStack && (
          <>
            <div
              className={classNames(
                "absolute bg-white",
                `paper-${handout.paperTexture}`
              )}
              style={{
                width: "100%",
                height: "100%",
                padding: `${handout.padding}cqw`,
                paddingBottom: `${handout.paddingBottom}cqw`,
                transform: "rotate(-3deg)",
                zIndex: -2,
                filter: `drop-shadow(0px 0px 8px ${hexToRgba("#000000", 0.5)})`,
              }}
            >
              {handout.imageUrl && (
                <img
                  style={{
                    transform: "scaleX(-1)",
                    filter: `hue-rotate(45deg) saturation(0.5)`,
                  }}
                  src={handout.imageUrl}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div
              className={classNames(
                "absolute bg-white",
                `paper-${handout.paperTexture}`
              )}
              style={{
                width: "100%",
                height: "100%",
                padding: `${handout.padding}cqw`,
                paddingBottom: `${handout.paddingBottom}cqw`,
                transform: "rotate(-6deg)",
                zIndex: -1,
                filter: `drop-shadow(0px 0px 8px ${hexToRgba("#000000", 0.5)})`,
              }}
            >
              {handout.imageUrl && (
                <img
                  src={handout.imageUrl}
                  style={{
                    transform: "scaleY(-1)",
                    filter: `hue-rotate(45deg) saturation(0.5)`,
                  }}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </>
        )}

        <div
          className={classNames(
            "bg-white relative",
            `paper-${handout.paperTexture}`
          )}
          style={{
            width: "100%",
            padding: `${handout.padding}cqw`,
            paddingBottom: `${handout.paddingBottom}cqw`,
            filter: `drop-shadow(0px 0px 8px ${hexToRgba("#000000", 0.5)})`,
          }}
        >
          {handout.showPin && (
            <div
              className="absolute z-40"
              style={{
                top: `${handout.pinOffset}cqw`,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                className="bg-red-600 rounded-full"
                style={{
                  width: `${handout.pinSize}cqw`,
                  height: `${handout.pinSize}cqw`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  filter: `drop-shadow(3px 3px 3px ${hexToRgba(
                    "#000000",
                    0.5
                  )})`,
                }}
              >
                <div
                  className="bg-red-700 rounded-full absolute"
                  style={{
                    width: `${handout.pinSize * 0.75}cqw`,
                    height: `${handout.pinSize * 0.75}cqw`,
                    top: `${handout.pinSize * 0.125}cqw`,
                    left: `${handout.pinSize * 0.125}cqw`,
                  }}
                />
              </div>
            </div>
          )}

          {handout.showPaperclip && (
            <div
              className="absolute"
              style={{
                top: `${handout.paperclipOffset}cqw`,
                left: `${handout.paperclipLeftOffset}cqw`,
                transform: "rotate(5deg)",
                zIndex: 10,
                clipPath: `polygon(0 0, ${handout.paperclipSize * 4}cqw 0, ${
                  handout.paperclipSize * 4
                }cqw ${handout.paperclipSize * 4}cqw, 0 ${
                  handout.paperclipSize * 4
                }cqw)`,
              }}
            >
              <div
                className="absolute"
                style={{
                  width: `${handout.paperclipSize}cqw`,
                  height: `${handout.paperclipSize * 3.3}cqw`,
                  border: `${handout.paperclipSize * 0.125}cqw solid #B8B8B8`,
                  borderLeft: "none",
                  borderRadius: `${handout.paperclipSize * 0.5}cqw`,
                  filter: "drop-shadow(0px 0px 2px #000)",
                }}
              />
              <div
                className="absolute"
                style={{
                  width: `${handout.paperclipSize}cqw`,
                  top: `${handout.paperclipSize * 1.25}cqw`,
                  height: `${handout.paperclipSize * 2.08}cqw`,
                  border: `${handout.paperclipSize * 0.125}cqw solid #B8B8B8`,
                  filter: "drop-shadow(0px 0px 2px #000)",
                  borderTop: "none",
                  borderRight: "none",
                  borderRadius: `0 ${handout.paperclipSize * 0.5}cqw ${
                    handout.paperclipSize * 0.5
                  }cqw ${handout.paperclipSize * 0.5}cqw`,
                }}
              ></div>
            </div>
          )}

          <div
            className="bg-gray-100"
            style={{
              width: "100%",
              aspectRatio: "1",
              marginBottom: `${handout.captionGap}cqw`,
            }}
          >
            {handout.imageUrl && (
              <img
                src={handout.imageUrl}
                alt="the polaroid"
                className="w-full h-full object-cover"
                style={getImageProcessingStyles(handout.imagePostProcessing)}
              />
            )}
          </div>

          <div className="relative">
            <div
              className={classNames(
                "relative z-20",
                handout.captionText.font,
                handout.captionText.fontWeight,
                handout.captionText.textAlign
              )}
              style={{
                fontSize: `${handout.captionText.fontSize}cqw`,
              }}
            >
              {handout.captionText.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import classNames from "classnames";
import { PolaroidConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba, getImageProcessingStyles } from "../utils";

type PolaroidData = ExtractConfigValues<typeof PolaroidConfig>;

export const Polaroid = ({ handout }: { handout: PolaroidData }) => {
  return (
    <div className="relative inline-block transition-all">
      {handout.showStack && (
        <>
          <div
            className={classNames(
              "absolute bg-white p-4 pb-16",
              `paper-${handout.paperTexture}`
            )}
            style={{
              width: "400px",
              height: "100%",
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
              "absolute bg-white p-4 pb-16",
              `paper-${handout.paperTexture}`
            )}
            style={{
              width: "400px",
              height: "100%",
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
          "bg-white p-4 pb-16 transition-all relative min-h-[510px] max-h-[510px]",
          `paper-${handout.paperTexture}`
        )}
        style={{
          width: "400px",
          filter: `drop-shadow(0px 0px 8px ${hexToRgba("#000000", 0.5)})`,
        }}
      >
        {handout.showPin && (
          <div
            className="absolute z-40"
            style={{
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="w-8 h-8 bg-red-600 rounded-full"
              style={{
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                filter: `drop-shadow(3px 3px 3px ${hexToRgba("#000000", 0.5)})`,
              }}
            >
              <div className="w-6 h-6 bg-red-700 rounded-full absolute top-1 left-1" />
            </div>
          </div>
        )}

        {handout.showPaperclip && (
          <div
            className="absolute"
            style={{
              top: "-8px",
              left: "30px",
              transform: "rotate(5deg)",
              zIndex: 10,
              clipPath: "polygon(0 0, 100px 0, 100px 100px, 0 100px)",
            }}
          >
            <div
              className="absolute"
              style={{
                width: "24px",
                height: "80px",
                border: "3px solid #B8B8B8",
                borderLeft: "none",
                borderRadius: "12px 12px 12px 12px",
                filter: "drop-shadow(0px 0px 2px #000)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: "24px",
                top: "30px",
                height: "50px",
                border: "3px solid #B8B8B8",
                filter: "drop-shadow(0px 0px 2px #000)",
                borderTop: "none",
                borderRight: "none",
                borderRadius: "0 12px 12px 12px",
              }}
            ></div>
          </div>
        )}

        <div
          className="bg-gray-100 mb-3"
          style={{
            width: "100%",
            aspectRatio: "1",
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
              handout.captionText.textAlign,
              handout.captionText.textStyle
            )}
            style={{
              fontSize: `${handout.captionText.fontSize}px`,
            }}
          >
            {handout.captionText.text}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import type { ExtractConfigValues } from "../types";
import type { SciFiHologramConfig } from "../handoutConfigs";
import { hexToRgba } from "../utils";
import classNames from "classnames";

type SciFiHologramData = ExtractConfigValues<typeof SciFiHologramConfig>;

interface SciFiHologramProps {
  data: SciFiHologramData;
}

/**
 * Basically, use the width and height from the loaded data - dont rely on the image itself
 * cus CSS is wank and shit immediately goes to fuck shit
 */

export function SciFiHologram({ data }: SciFiHologramProps) {
  const { image, overlayColor } = data;
  const scanlineSize = data.scanlines.size as unknown as string;

  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  // get the image width and height
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = image;
  }, [image]);

  let baseFilter = `
drop-shadow(0px 0px 3px ${hexToRgba("#FFFFFF", 0.2)})
drop-shadow(0px 0px 6px ${overlayColor})
drop-shadow(0px 0px 15px ${overlayColor})
  `;
  if (data.warbleEffect) {
    baseFilter += ` url(#roughEdges)`;
  }

  const scanlinesCss = `
to bottom,
transparent 0px,
transparent ${scanlineSize}px,
${hexToRgba("#000000", data.scanlines.opacity)} ${scanlineSize}px,
${hexToRgba("#000000", data.scanlines.opacity)} ${
    parseInt(scanlineSize) + parseInt(scanlineSize)
  }px
`;

  return (
    <div
      className={classNames(
        "flex w-full justify-center",
        data.isFadeOut && "fade-bottom",
        data.isTransparent && "opacity-80"
      )}
    >
      <div
        style={{
          width: `${imageDimensions.width}px`,
          height: `${imageDimensions.height}px`,
          marginTop: `${data.positioning.yOffset}%`,
          marginLeft: `${data.positioning.xOffset}%`,
        }}
        className={classNames(
          "main-wrapper relative h-[80vh]"
          // data.isFadeOut && "fade-bottom",
          // data.isTransparent && "opacity-80"
        )}
      >
        <img
          className="h-full"
          src={data.image}
          style={{
            filter: baseFilter,
          }}
        />

        {/* this is the colour effect layer: it makes the image go the right colour */}
        <div
          style={{
            width: `${imageDimensions.width}px`,
            backgroundColor: overlayColor,
            maskImage: `url(${data.image})`,
            maskRepeat: "no-repeat",
            mixBlendMode: "color",
            backgroundImage:
              (data.scanlines.size >= 1 &&
                `repeating-linear-gradient(
            ${scanlinesCss}
          )`) ||
              "",
          }}
          className="absolute top-0 left-0 h-full w-full noise-filter"
        ></div>

        {/* this is the "effect" layer: it modifies the colour layer to make it look like it's been "burned in" or 
other effects */}
        <div
          style={{
            width: `${imageDimensions.width}px`,
            backgroundColor: "#ccc",
            maskImage: `url(${data.image})`,
            maskRepeat: "no-repeat",
            backgroundImage:
              (data.scanlines.size >= 1 &&
                `repeating-linear-gradient(
            ${scanlinesCss}
          )`) ||
              "",
          }}
          className={classNames(
            "absolute top-0 left-0 h-full w-full noise-filter",
            data.blendEffect
          )}
        ></div>
      </div>
    </div>
  );
}

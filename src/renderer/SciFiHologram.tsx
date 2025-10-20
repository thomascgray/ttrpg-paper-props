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

  const [aspectRatio, setAspectRatio] = useState(1);

  // get the image aspect ratio
  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
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
transparent 0cqw,
transparent ${data.scanlines.size}cqw,
${hexToRgba("#000000", data.scanlines.opacity)} ${data.scanlines.size}cqw,
${hexToRgba("#000000", data.scanlines.opacity)} ${data.scanlines.size * 2}cqw
`;

  return (
    <div
      style={{ width: `${data.pageWidth}cqw` }}
      className={classNames(
        "xl:max-w-[50em] max-w-[40em] relative inline-block",
        data.isFadeOut && "fade-bottom",
        data.isTransparent && "opacity-80"
      )}
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio: aspectRatio,
          }}
          className="main-wrapper relative"
        >
          <img
            className="w-full h-full object-contain"
            src={data.image}
            style={{
              filter: baseFilter,
            }}
          />

          {/* this is the colour effect layer: it makes the image go the right colour */}
          <div
            style={{
              backgroundColor: overlayColor,
              maskImage: `url(${data.image})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              mixBlendMode: "color",
              backgroundImage:
                (data.scanlines.size >= 0.1 &&
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
              backgroundColor: "#ccc",
              maskImage: `url(${data.image})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              backgroundImage:
                (data.scanlines.size >= 0.1 &&
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
    </div>
  );
}

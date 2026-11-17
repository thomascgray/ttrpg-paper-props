import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import classNames from "classnames";
import { GravestoneConfig, GRAVESTONE_IMAGES } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { getImageProcessingStyles } from "../utils";

type GravestoneData = ExtractConfigValues<typeof GravestoneConfig>;

const CarvedSections = ({
  handout,
  layerClassName,
}: {
  handout: GravestoneData;
  layerClassName: string;
}) => (
  <div
    className="flex flex-col w-full"
    style={{ gap: `${handout.sectionGap}cqw` }}
  >
    {handout.sections.map((section) => (
      <div
        key={section.id}
        className={classNames("w-full", layerClassName)}
        style={{
          fontSize: `${section.fontSize}cqw`,
          lineHeight: 1.15,
        }}
      >
        <Markdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          className={`block ${section.textAlign} ${section.font} ${section.fontWeight} copy-markdown list-inside list-disc w-full`}
        >
          {section.mainCopy}
        </Markdown>
      </div>
    ))}
  </div>
);

export const Gravestone = ({ handout }: { handout: GravestoneData }) => {
  const textArea =
    GRAVESTONE_IMAGES[handout.gravestoneImage] ??
    Object.values(GRAVESTONE_IMAGES)[0];

  return (
    <div
      className="relative max-w-[80em]"
      style={{ width: `${handout.pageWidth}cqw` }}
    >
      <div className="w-full h-full" style={{ containerType: "inline-size" }}>
        <div className="relative w-full">
          <img
            src={handout.gravestoneImage}
            alt="Gravestone"
            className="w-full h-auto"
            style={{
              transform: `scaleX(${handout.image.scaleX}) scaleY(${handout.image.scaleY})`,
              ...getImageProcessingStyles(handout.image),
            }}
          />

          {/* Highlight layer first so the carved layer multiplies over it */}
          {(["carved-stone-highlight", "carved-stone-text"] as const).map(
            (layerClassName) => (
              <div
                key={layerClassName}
                className={classNames("absolute", `${layerClassName}-layer`, {
                  "rough-edges-subtle": handout.weathered,
                })}
                style={
                  {
                    top: `${textArea.top}%`,
                    left: `${textArea.left}%`,
                    width: `${textArea.width}%`,
                    marginTop: `${handout.textYOffset}cqw`,
                    "--carve-depth": handout.carveDepth,
                  } as React.CSSProperties
                }
              >
                <CarvedSections
                  handout={handout}
                  layerClassName={layerClassName}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

import { CharacterCardConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type CharacterCardData = ExtractConfigValues<typeof CharacterCardConfig>;

export const CharacterCard = ({ handout }: { handout: CharacterCardData }) => {
  return (
    <>
      {/* the whole thing */}
      <div
        style={{
          width: `${handout.pageWidth}px`,
          boxShadow: `${
            handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${handout.positioning.yOffset}%`,
          marginLeft: `${handout.positioning.xOffset}%`,
        }}
        className={`inline-block overflow-visible transition-all ${handout.font} ${handout.fontWeight} ${handout.imageFilter} paper-${handout.paperTexture}`}
      >
        <img
          className=""
          src={handout.imageUrl}
          style={{
            mixBlendMode: "multiply",
            margin: "10%",
            marginBottom: "6%",
            width: "calc(100% - 20%)",
          }}
        />

        <div
          className={`${handout.textAlign} ${handout.inkColor} space-y-2`}
          style={{
            marginBottom: "6%",
          }}
        >
          {handout.textLineOne !== "" && (
            <span
              id="text_line_one"
              className={`font-black`}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.fontSize * 2.5}px`,
              }}
            >
              {handout.textLineOne}
            </span>
          )}
          {(handout.textLineTwo as string) !== "" && (
            <span
              id="text_line_two"
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.fontSize * 1.5}px`,
              }}
            >
              {handout.textLineTwo}
            </span>
          )}
          {(handout.textLineThree as string) !== "" && (
            <span
              id="text_line_three"
              className={`italic text-gray-700 `}
              style={{
                display: "block",
                marginLeft: "10%",
                marginRight: "10%",
                fontSize: `${handout.fontSize}px`,
              }}
            >
              {handout.textLineThree}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

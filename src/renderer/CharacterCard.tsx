import { CharacterCardConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type CharacterCardData = ExtractConfigValues<typeof CharacterCardConfig>;

export const CharacterCard = ({ handout }: { handout: CharacterCardData }) => {
  return (
    <>
      {/* Main character card container */}
      <div
        style={{
          width: `${handout.dimensions.pageWidth}cqw`,
          height: `${handout.dimensions.pageHeight}cqw`,
          boxShadow: `${
            handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
          }`,
        }}
        className={`inline-block overflow-visible ${handout.imageFilter} paper-${handout.paperTexture}`}
      >
        {/* Container query wrapper for content scaling */}
        <div style={{ containerType: "inline-size" }} className="w-full h-full">
          {/* Image section */}
          <img
            className=""
            src={handout.imageUrl}
            style={{
              mixBlendMode: "multiply",
              margin: "5cqw",
              marginBottom: "3cqw",
              width: "calc(100% - 10cqw)",
            }}
          />

          {/* Text content section */}
          <div
            className={`${handout.inkColor} space-y-[1cqw]`}
            style={{
              marginBottom: "3cqw",
              paddingLeft: "5cqw",
              paddingRight: "5cqw",
            }}
          >
            {handout.lineOne.content !== "" && (
              <span
                id="text_line_one"
                className={`${handout.lineOne.font} ${handout.lineOne.fontWeight} ${handout.lineOne.textAlign}`}
                style={{
                  display: "block",
                  fontSize: `${handout.lineOne.fontSize}cqw`,
                }}
              >
                {handout.lineOne.content}
              </span>
            )}
            {(handout.lineTwo.content as string) !== "" && (
              <span
                id="text_line_two"
                className={`${handout.lineTwo.font} ${handout.lineTwo.fontWeight} ${handout.lineTwo.textAlign}`}
                style={{
                  display: "block",
                  fontSize: `${handout.lineTwo.fontSize}cqw`,
                }}
              >
                {handout.lineTwo.content}
              </span>
            )}
            {(handout.lineThree.content as string) !== "" && (
              <span
                id="text_line_three"
                className={`${handout.lineThree.font} ${handout.lineThree.fontWeight} ${handout.lineThree.textAlign}`}
                style={{
                  display: "block",
                  fontSize: `${handout.lineThree.fontSize}cqw`,
                }}
              >
                {handout.lineThree.content}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
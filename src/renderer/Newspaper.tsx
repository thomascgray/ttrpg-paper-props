import classNames from "classnames";
import Markdown from "react-markdown";
import { NewspaperConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba } from "../utils";

type NewspaperData = ExtractConfigValues<typeof NewspaperConfig>;

export const Newspaper = ({ handout }: { handout: NewspaperData }) => {
  const paperTint = hexToRgba(handout.paperTint, 0.5);

  return (
    <div className="relative">
      {/* the front page */}
      <div
        style={{
          backgroundColor: paperTint,
          backgroundBlendMode: "multiply",
          boxShadow: `${
            handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
          }`,
        }}
        className={`paper
relative
z-20
paper-${handout.paperTexture} ${handout.inkColor}
overflow-clip
max-w-[80em]
aspect-[16/9]
w-[90cqw]
p-10
`}
      >
        <div
          style={{
            containerType: "inline-size",
          }}
          className="w-full"
        >
          <div id="title">
            <span
              className={`${handout.title.titleFont} font-black text-center flex items-center justify-around`}
              style={{
                fontSize: `4cqw`,
                lineHeight: `${handout.title.lineHeight}em`,
                marginTop: `${handout.title.topMargin}px`,
                marginBottom: `${handout.title.bottomMargin}px`,
              }}
            >
              {handout.title.title}
            </span>
          </div>

          {!handout.bannerTexts.hideTopBannerBorder && (
            <hr className="border-solid border-2 border-gray-600" />
          )}

          <div id="banner_texts" className="flex justify-between py-2">
            <label
              style={{
                fontSize: `1.2cqw`,
              }}
              className={`text-left text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
            >
              {handout.bannerTexts.bannerText1}
            </label>

            <label
              style={{
                fontSize: `1.2cqw`,
              }}
              className={`text-center text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
            >
              {handout.bannerTexts.bannerText2}
            </label>

            <label
              style={{
                fontSize: `1.2cqw`,
              }}
              className={`text-right text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
            >
              {handout.bannerTexts.bannerText3}
            </label>
          </div>

          {!handout.bannerTexts.hideBottomBannerBorder && (
            <hr className="border-solid border-2 border-gray-600" />
          )}

          {/* the headline */}
          <span
            id="headline"
            className={`${handout.headline.headlineFont} font-semibold whitespace-pre-line block text-center`}
            style={{
              textWrap: "balance",
              fontSize: `4cqw`,
            }}
          >
            {handout.headline.headline}
          </span>

          <hr className="border-solid border-4 border-gray-800 my-4" />

          {(handout.quote.quote as string) !== "" && (
            <p
              id="quote"
              style={{
                fontSize: `2cqw`,
              }}
              className={`font-serif font-bold text-justify italic my-4 ${handout.quote.quoteFont}`}
            >
              {handout.quote.quote}
            </p>
          )}

          <div
            id="main_copy"
            style={{
              fontSize: "1cqw",
            }}
          >
            <Markdown
              className={classNames(
                `${handout.mainCopy.textAlign} font-serif copy-markdown column-count-${handout.mainCopy.mainCopyColumns} ${handout.mainCopy.imageFilter}`,
                {
                  blurry: handout.mainCopy.isMainCopyBlurry,
                }
              )}
            >
              {handout.mainCopy.mainCopyContent}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
};

import classNames from "classnames";
import Markdown from "react-markdown";
import { ExtractConfigValues, NewspaperConfig } from "../db";
import { hexToRgba } from "../utils";

type NewspaperData = ExtractConfigValues<typeof NewspaperConfig>;

export const Newspaper = ({ handout }: { handout: NewspaperData }) => {
  const paperTint = hexToRgba(handout.paperTint, 0.5);

  return (
    <div
      className="relative translate-y-20"
      style={{
        width: `${handout.pageWidthPercentage}%`,
        marginTop: `calc(-100px + ${handout.positioning.yOffset}%)`,
        marginLeft: `${handout.positioning.xOffset}%`,
        transformOrigin: "center",
      }}
    >
      {/* the "fake page" behind it */}
      <div
        style={{
          backgroundColor: paperTint,
          backgroundBlendMode: "multiply",
          position: "absolute",
          top: "-25px",
          left: "25px",
          boxShadow: `${
            handout.isPaperShadow ? "inset -10px 10px 25px #000000" : "none"
          }`,
        }}
        className={`paper relative z-10 w-full h-[calc(100%-58px)] paper-behind paper-${handout.paperTexture} ${handout.inkColor} p-10`}
      ></div>

      {/* the front page */}
      <div
        style={{
          backgroundColor: paperTint,
          backgroundBlendMode: "multiply",
          boxShadow: `${
            handout.isPaperShadow ? "inset 0 0 25px #000000" : "none"
          }`,
          marginBottom: "58px",
        }}
        className={`paper relative z-20 h-[calc(100%-57px)] paper-${handout.paperTexture} ${handout.inkColor} p-10 overflow-clip rounded-bl-[2rem]`}
      >
        <div id="title">
          <span
            className={`${handout.title.titleFont} font-black text-center flex items-center justify-around`}
            style={{
              fontSize: `${handout.title.titleFontSize}px`,
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
              fontSize: `${handout.bannerTexts.bannerSize}px`,
            }}
            className={`text-left text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
          >
            {handout.bannerTexts.bannerText1}
          </label>

          <label
            style={{
              fontSize: `${handout.bannerTexts.bannerSize}px`,
            }}
            className={`text-center text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
          >
            {handout.bannerTexts.bannerText2}
          </label>

          <label
            style={{
              fontSize: `${handout.bannerTexts.bannerSize}px`,
            }}
            className={`text-right text-gray-800 font-bold font-serif w-4/12 ${handout.bannerTexts.bannerFont}`}
          >
            {handout.bannerTexts.bannerText3}
          </label>
        </div>

        {!handout.bannerTexts.hideBottomBannerBorder && (
          <hr className="border-solid border-2 border-gray-600" />
        )}

        <span
          id="headline"
          className={`${handout.headline.headlineFont} font-semibold whitespace-pre-line block text-center`}
          style={{
            textWrap: "balance",
            fontSize: `${handout.headline.headlineFontSize}px`,
          }}
        >
          {handout.headline.headline}
        </span>

        <hr className="border-solid border-4 border-gray-800 my-4" />

        {(handout.quote.quote as string) !== "" && (
          <p
            id="quote"
            style={{
              fontSize: `${handout.quote.quoteFontSize}px`,
            }}
            className={`font-serif font-bold text-justify italic my-4 ${handout.quote.quoteFont}`}
          >
            {handout.quote.quote}
          </p>
        )}

        <div id="main_copy">
          <Markdown
            className={classNames(
              `${handout.mainCopy.textAlign} font-serif copy-markdown column-count-${handout.mainCopy.mainCopyColumns} ${handout.mainCopy.imageFilter}`,
              {
                blurry: handout.mainCopy.isMainCopyBlurry,
              },
            )}
          >
            {handout.mainCopy.mainCopyContent}
          </Markdown>
        </div>
      </div>

      {/* the weird curve */}
      <div
        style={{
          backgroundColor: paperTint,
          backgroundBlendMode: "multiply",
          boxShadow: `${
            handout.isPaperShadow ? "inset -10px 0 25px #000000" : "none"
          }`,
        }}
        className={`paper paper-${handout.paperTexture} absolute bottom-[58px] -right-[25px] w-20 h-20 rounded-br-[2rem]`}
      ></div>
    </div>
  );
};

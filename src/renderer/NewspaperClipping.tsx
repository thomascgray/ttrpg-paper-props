import classNames from "classnames";
import Markdown from "react-markdown";
import { NewspaperClippingConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";
import { hexToRgba } from "../utils";

type NewspaperClippingData = ExtractConfigValues<
  typeof NewspaperClippingConfig
>;

export const NewspaperClipping = ({
  handout,
}: {
  handout: NewspaperClippingData;
}) => {
  const paperTint = hexToRgba(handout.paper.paperTint, 0.5);
  return (
    <div
      style={{
        backgroundColor: paperTint,
        backgroundBlendMode: "multiply",
        width: `${handout.dimensions.pageWidth}cqw`,
        boxShadow: `${
          handout.paper.isPaperShadow ? "inset 0 0 25px #000000" : "none"
        }`,
      }}
      className={classNames(
        `xl:max-w-[28em] max-w-[25em] paper transition paper-${handout.paper.paperTexture}  max-w-[80em] overflow-clip`
      )}
    >
      <div
        className="inner-1 w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div
          className={`flex h-full items-center border-2 border-t-0 border-b-0 ${handout.inkColor}`}
          style={{
            marginLeft: "12cqw",
            marginRight: "12cqw",
            paddingLeft: "8cqw",
            paddingRight: "8cqw",
          }}
        >
          <div
            style={{
              marginTop: `${handout.dimensions.clippingTopPadding}cqw`,
              marginBottom: `${handout.dimensions.clippingBottomPadding}cqw`,
            }}
            className="w-full h-full"
          >
            <div className="space-y-8">
              {handout.prefixCopy.content !== "" && (
                <div
                  style={{
                    fontSize: `${handout.prefixCopy.fontSize}cqw`,
                  }}
                >
                  <Markdown
                    className={classNames(
                      `block font-serif text-justify copy-markdown  clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`,
                      {
                        blurry: handout.prefixCopy.isBlurry,
                      }
                    )}
                  >
                    {handout.prefixCopy.content}
                  </Markdown>
                </div>
              )}
              {handout.mainCopy.content !== "" && (
                <div
                  style={{
                    fontSize: `${handout.mainCopy.fontSize}cqw`,
                  }}
                >
                  <Markdown
                    className={`block font-serif text-justify  copy-markdown clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`}
                  >
                    {handout.mainCopy.content}
                  </Markdown>
                </div>
              )}
              {handout.suffixCopy.content !== "" && (
                <div
                  style={{
                    fontSize: `${handout.suffixCopy.fontSize}cqw`,
                  }}
                >
                  <Markdown
                    className={classNames(
                      `block font-serif text-justify copy-markdown  clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`,
                      {
                        blurry: handout.suffixCopy.isBlurry,
                      }
                    )}
                  >
                    {handout.suffixCopy.content}
                  </Markdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

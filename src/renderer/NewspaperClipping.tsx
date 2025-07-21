import React from "react";
import classNames from "classnames";
import Markdown from "react-markdown";
import { NEWSPAPER_CLIPPING } from "../config";
import { ExtractConfigValues, NewspaperClippingConfig } from "../db";
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
        width: `${handout.dimensions.pageWidth}px`,
        height: `${handout.dimensions.pageHeight}px`,
        boxShadow: `${
          handout.paper.isPaperShadow ? "inset 0 0 25px #000000" : "none"
        }`,
      }}
      className={classNames(
        `paper transition paper-${handout.paper.paperTexture}`
      )}
    >
      <div
        className={`flex h-full items-center border-2 border-t-0 border-b-0 mx-10 px-8 overflow-hidden ${handout.inkColor}`}
      >
        <div className="space-y-8">
          {handout.prefix_copy !== "" && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`,
                {
                  blurry: handout.isPrefixBlurry,
                }
              )}
            >
              {handout.prefix_copy}
            </Markdown>
          )}
          {handout.mainCopy !== "" && (
            <Markdown
              className={`block font-serif text-justify prose copy-markdown clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`}
            >
              {handout.mainCopy}
            </Markdown>
          )}
          {handout.suffix_copy !== "" && (
            <Markdown
              className={classNames(
                `block font-serif text-justify copy-markdown prose clipping-markdown ${handout.font} ${handout.inkColor} ${handout.imageFilter}`,
                {
                  blurry: handout.isSuffixBlurry,
                }
              )}
            >
              {handout.suffix_copy}
            </Markdown>
          )}
        </div>
      </div>
    </div>
  );
};

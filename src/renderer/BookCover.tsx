import React from "react";
import Markdown from "react-markdown";
import { BookCoverConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type BookCoverData = ExtractConfigValues<typeof BookCoverConfig>;

export const BookCover = ({ handout }: { handout: BookCoverData }) => {
  return (
    <div className="relative">
      <div className={`image-wrapper`}>
        <img src={handout.bookCoverTemplate} alt="The book cover" width={700} />
      </div>

      <div
        id="main_copy"
        style={{
          fontSize: `${handout.fontSize}px`,
          marginLeft: `${handout.textLeftMargin}px`,
          width: "80%",
        }}
        className={`absolute ${handout.textEffect} ${handout.font} ${handout.fontWeight} top-[2em] left-[2em]`}
      >
        <Markdown
          className={`block copy-markdown ${handout.inkColor} ${handout.textAlign}`}
        >
          {handout.mainCopy}
        </Markdown>
      </div>
    </div>
  );
};

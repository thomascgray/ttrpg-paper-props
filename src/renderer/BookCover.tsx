import React from "react";
import Markdown from "react-markdown";
import { BookCoverConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type BookCoverData = ExtractConfigValues<typeof BookCoverConfig>;

export const BookCover = ({ handout }: { handout: BookCoverData }) => {
  return (
    <div
      style={{
        maxWidth: "700px",
        width: "100%",
        containerType: "inline-size",
      }}
      className="relative"
    >
      <img
        style={{
          maxWidth: "700px",
          width: "100%",
        }}
        src={handout.bookCoverTemplate}
        alt="The book cover"
      />

      <div
        className="absolute top-[5%] left-[5%] w-[90%] h-[90%]"
        style={{
          fontSize: `${handout.fontSize}cqw`,
        }}
      >
        <Markdown
          className={`block copy-markdown ${handout.inkColor} ${handout.textAlign} ${handout.textEffect} ${handout.font} ${handout.fontWeight}`}
        >
          {handout.mainCopy}
        </Markdown>
      </div>
    </div>
  );
};

import Markdown from "markdown-to-jsx";
import { BookCoverConfig } from "../handoutConfigs";
import { ExtractConfigValues } from "../types";

type BookCoverData = ExtractConfigValues<typeof BookCoverConfig>;

export const BookCover = ({ handout }: { handout: BookCoverData }) => {
  return (
    <div className="w-full max-w-[700px] h-auto relative">
      <img src={handout.bookCoverTemplate} alt="The book cover" />
      <div
        style={{
          containerType: "inline-size",
          width: "80%",
          position: "absolute",
          top: "0",
          left: "2%",
          margin: "10%",
        }}
      >
        <div
          className="absolute"
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
    </div>
  );
};

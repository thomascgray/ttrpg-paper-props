import Markdown from "react-markdown";
import type { ExtractConfigValues } from "../types";
import type { BookStackConfig } from "../handoutConfigs";
import type { BookSpine } from "../bookStackDefaults";

type BookStackData = ExtractConfigValues<typeof BookStackConfig>;

interface BookSpineProps {
  book: BookSpine;
}

const BookSpineComponent = ({ book }: BookSpineProps) => {
  return (
    <div
      className={`absolute whitespace-nowrap ${book.font} ${book.fontWeight}`}
      style={{
        left: `calc(50% + ${book.xOffset}cqw)`,
        top: `${book.yOffset}%`,
        transform: `translate(-50%, -50%) rotate(${book.rotation}deg)`,
        fontSize: `${book.fontSize}cqw`,
        color: book.colour,
        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
      }}
    >
      <Markdown className="copy-markdown text-center [&_p]:whitespace-nowrap">{book.text}</Markdown>
    </div>
  );
};

export const BookStack: React.FC<{ handout: BookStackData }> = ({
  handout,
}) => {
  return (
    <div
      style={{ width: `${handout.pageWidth}cqw` }}
      className="xl:max-w-[50em] max-w-[40em] relative"
    >
      <div
        className="w-full h-full"
        style={{
          containerType: "inline-size",
        }}
      >
        <div className="relative">
          {/* Book stack image */}
          <img
            src={handout.bookStackImage}
            alt="Stack of books"
            className="w-full h-auto"
          />

          {/* Text overlay container */}
          <div className="absolute inset-0">
            {handout.books.map((book) => (
              <BookSpineComponent key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

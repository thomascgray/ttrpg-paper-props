import type { ExtractConfigValues } from "../types";
import type { BookStackConfig } from "../handoutConfigs";

type BookStackData = ExtractConfigValues<typeof BookStackConfig>;

interface BookSpineProps {
  book: {
    text: string;
    font: string;
    fontSize: number;
    fontWeight: string;
    colour: string;
    xOffset: number;
    yOffset: number;
    rotation: number;
  };
}

const BookSpine = ({ book }: BookSpineProps) => {
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
      {book.text}
    </div>
  );
};

export const BookStack: React.FC<{ handout: BookStackData }> = ({
  handout,
}) => {
  const books = [
    handout.book1,
    handout.book2,
    handout.book3,
    handout.book4,
    handout.book5,
    handout.book6,
    handout.book7,
  ];

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
            {books.map((book, index) => (
              <BookSpine key={index} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import type { BookSpine } from "../bookStackDefaults";
import { syncBooksToImage } from "../bookStackDefaults";
import { TextArea } from "./TextArea";
import { RangeInput } from "./RangeInput";
import { FontSelector } from "./FontSelector";
import { FontWeightSelector } from "./FontWeightSelector";
import { ColourPicker } from "./ColourPicker";

interface BooksArrayProps {
  label: string;
  value: BookSpine[];
  onUpdate: (value: BookSpine[]) => void;
  bookStackImage?: string;
}

export const BooksArray: React.FC<BooksArrayProps> = ({
  label,
  value,
  onUpdate,
  bookStackImage,
}) => {
  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
  const prevImageRef = useRef(bookStackImage);

  // Sync books when the book stack image changes
  useEffect(() => {
    if (bookStackImage && prevImageRef.current !== bookStackImage) {
      const syncedBooks = syncBooksToImage(value, bookStackImage);
      onUpdate(syncedBooks);
      prevImageRef.current = bookStackImage;
    }
  }, [bookStackImage, value, onUpdate]);

  const toggleBook = (id: string) => {
    setExpandedBooks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateBook = (id: string, field: keyof BookSpine, newValue: any) => {
    onUpdate(
      value.map((book) => {
        if (book.id === id) {
          return { ...book, [field]: newValue };
        }
        return book;
      })
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{label}</h3>

      {(value || []).map((book, index) => {
        const isExpanded = expandedBooks.has(book.id);

        return (
          <div key={book.id} className="bg-gray-100 rounded-lg overflow-hidden">
            {/* Collapsible header */}
            <button
              type="button"
              onClick={() => toggleBook(book.id)}
              className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-200 transition-colors"
            >
              <span className="font-medium">
                Book {index + 1}: {book.text || "(empty)"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                <TextArea
                  label="Text (supports markdown)"
                  value={book.text}
                  onUpdate={(val) => updateBook(book.id, "text", val)}
                  rows={2}
                  autoResize
                />

                <FontSelector
                  label="Font"
                  value={book.font}
                  onUpdate={(val) => updateBook(book.id, "font", val)}
                />

                <RangeInput
                  label="Font Size"
                  value={book.fontSize.toString()}
                  min={0.5}
                  max={10}
                  step={0.1}
                  suffix="cqw"
                  onUpdate={(val) => updateBook(book.id, "fontSize", parseFloat(val))}
                />

                <FontWeightSelector
                  label="Weight"
                  value={book.fontWeight}
                  onUpdate={(val) => updateBook(book.id, "fontWeight", val)}
                />

                <ColourPicker
                  label="Colour"
                  value={book.colour}
                  onUpdate={(val) => updateBook(book.id, "colour", val)}
                />

                <RangeInput
                  label="X Offset"
                  value={book.xOffset.toString()}
                  min={-50}
                  max={50}
                  step={0.5}
                  suffix=""
                  onUpdate={(val) => updateBook(book.id, "xOffset", parseFloat(val))}
                />

                <RangeInput
                  label="Y Offset"
                  value={book.yOffset.toString()}
                  min={-50}
                  max={150}
                  step={0.5}
                  suffix=""
                  onUpdate={(val) => updateBook(book.id, "yOffset", parseFloat(val))}
                />

                <RangeInput
                  label="Rotation"
                  value={book.rotation.toString()}
                  min={-90}
                  max={90}
                  step={1}
                  suffix="deg"
                  onUpdate={(val) => updateBook(book.id, "rotation", parseFloat(val))}
                />
              </div>
            )}
          </div>
        );
      })}

      {(!value || value.length === 0) && (
        <p className="text-gray-500 italic">
          No books available for this stack image.
        </p>
      )}
    </div>
  );
};

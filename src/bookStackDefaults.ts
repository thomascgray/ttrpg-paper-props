import { nanoid } from "nanoid";
import { FontFamily, FontWeight } from "./enums";

/**
 * Book spine defaults - the template for each book's properties.
 * Does not include `id` since that's generated at runtime.
 */
export interface BookSpineDefaults {
  text: string;
  font: FontFamily;
  fontSize: number;
  fontWeight: FontWeight;
  colour: string;
  xOffset: number;
  yOffset: number;
  rotation: number;
}

/**
 * Runtime book spine data - includes unique id for React keys.
 */
export interface BookSpine extends BookSpineDefaults {
  id: string;
}

/**
 * Single source of truth for all book stack image defaults.
 * Key is the image path, value is array of book defaults (top to bottom).
 */
export const BOOK_STACK_DEFAULTS: Record<string, BookSpineDefaults[]> = {
  "/images/book_stacks/book-stack-2915944_1920.png": [
    // Book 1 - Top book (red, slight tilt)
    {
      text: "Ancient Lore",
      font: FontFamily.IM_FELL_DISPLAY,
      fontSize: 3.6,
      fontWeight: FontWeight.NORMAL,
      colour: "#e2bf55",
      xOffset: 2,
      yOffset: 7,
      rotation: -2,
    },
    // Book 2 - Second from top (red)
    {
      text: "Mystical Arts",
      font: FontFamily.UNIFRAKTURMAGUNTIA,
      fontSize: 5.5,
      fontWeight: FontWeight.NORMAL,
      colour: "#e2bf55",
      xOffset: -7,
      yOffset: 22,
      rotation: 1,
    },
    // Book 3 - Third from top (tan). Gold vanishes on the tan books, so they get dark ink.
    {
      text: "ARCANE SECRETS",
      font: FontFamily.PLAYFAIR_DISPLAY_SC,
      fontSize: 3.6,
      fontWeight: FontWeight.BOLD,
      colour: "#3b2412",
      xOffset: 1,
      yOffset: 35.5,
      rotation: 0.5,
    },
    // Book 4 - Fourth (tan/yellow)
    {
      text: "The Forbidden Tome",
      font: FontFamily.MEDIEVAL_SHARP,
      fontSize: 4.7,
      fontWeight: FontWeight.NORMAL,
      colour: "#4a1c0c",
      xOffset: -6,
      yOffset: 50,
      rotation: 0,
    },
    // Book 5 - Fifth (tan)
    {
      text: "A BESTIARY",
      font: FontFamily.CRETE_ROUND,
      fontSize: 3.2,
      fontWeight: FontWeight.NORMAL,
      colour: "#2e1a0e",
      xOffset: 2.5,
      yOffset: 65,
      rotation: 0,
    },
    // Book 6 - Sixth (olive/yellow)
    {
      text: "Dragon Tales",
      font: FontFamily.PIRATA_ONE,
      fontSize: 3.8,
      fontWeight: FontWeight.NORMAL,
      colour: "#3a2a10",
      xOffset: 7,
      yOffset: 78,
      rotation: 1,
    },
    // Book 7 - Bottom book (dark red)
    {
      text: "SPELL CRAFT",
      font: FontFamily.QUATTROCENTO,
      fontSize: 3.2,
      fontWeight: FontWeight.BOLD,
      colour: "#e2bf55",
      xOffset: -1,
      yOffset: 91.5,
      rotation: 0,
    },
  ],
  // Add more book stack images here with their own defaults
};

/**
 * Labels for each book stack image (used in select dropdown and action button).
 */
export const BOOK_STACK_LABELS: Record<string, string> = {
  "/images/book_stacks/book-stack-2915944_1920.png": "7 Book Stack",
};

export const DEFAULT_BOOK_STACK_IMAGE =
  "/images/book_stacks/book-stack-2915944_1920.png";

/**
 * Create books array with unique IDs from defaults for a given image.
 */
export const createBooksFromDefaults = (imagePath: string): BookSpine[] => {
  const defaults = BOOK_STACK_DEFAULTS[imagePath] ?? [];
  return defaults.map((d) => ({ ...d, id: nanoid() }));
};

/**
 * Sync books array when switching between book stack images.
 * - If new image has fewer books: truncate, keeping user content
 * - If new image has more books: keep existing, add defaults for extras
 */
export const syncBooksToImage = (
  currentBooks: BookSpine[],
  newImagePath: string
): BookSpine[] => {
  const newDefaults = BOOK_STACK_DEFAULTS[newImagePath] ?? [];
  const newCount = newDefaults.length;
  const currentCount = currentBooks.length;

  if (newCount <= currentCount) {
    // New image has fewer/equal books - truncate, keep user content
    return currentBooks.slice(0, newCount);
  } else {
    // New image has more books - keep existing, add defaults for extras
    const extraBooks = newDefaults.slice(currentCount).map((d) => ({
      ...d,
      id: nanoid(),
    }));
    return [...currentBooks, ...extraBooks];
  }
};

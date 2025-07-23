import Dexie, { type EntityTable } from "dexie";
import { nanoid } from "nanoid";
import { proxy, subscribe } from "valtio";

const APP_VERSION = 5;

export enum FontFamily {
  // Serif fonts
  SERIF = "font-serif",
  ALFA_SLAB_ONE = "font-alfa-slab-one",
  NEWSREADER = "font-newsreader",
  NOTICIA_TEXT = "font-noticia-text",
  YUJI_SYUKU = "font-yuji-syuku",
  CRETE_ROUND = "font-crete-round",
  PLAYFAIR_DISPLAY_SC = "font-playfair-display-sc",
  QUATTROCENTO = "font-quattrocento",
  IM_FELL = "font-im-fell",
  IM_FELL_DISPLAY = "font-im-fell-display",

  // Sans serif fonts
  SANS = "font-sans",

  // Cursive/Handwriting fonts
  CURSIVE = "font-cursive",
  INDIE_FLOWER = "font-indie-flower",
  DANCING_SCRIPT = "font-dancing-script",
  ZEYADA = "font-zeyada",
  MERIENDA = "font-merienda",
  SHADOWS_INTO_LIGHT = "font-shadows-into-light",
  CAVEAT = "font-caveat",

  // Fantasy fonts
  MEDIEVAL_SHARP = "font-medieval-sharp",
  MACONDO_REGULAR = "font-macondo-regular",
  MACONDO_SWASH_CAPS = "font-macondo-swash-caps",
  UNIFRAKTURMAGUNTIA = "font-unifrakturmaguntia",
  UNIFRAKTURCOOK = "font-unifrakturcook",
  PIRATA_ONE = "font-pirata-one",
  NEW_ROCKER = "font-new-rocker",
}

export enum FontWeight {
  LIGHT = "font-light",
  NORMAL = "font-normal",
  SEMI_BOLD = "font-semibold",
  BOLD = "font-bold",
}

export enum InkColor {
  BLACK = "ink-black",
  RED = "ink-red",
  GREEN = "ink-green",
  BLUE = "ink-blue",
  PURPLE = "ink-purple",
  SILVER = "ink-silver",
  TRUE_BLACK = "ink-true-black",
  TRUE_WHITE = "ink-true-white",
}

export enum CrtScreenTextColor {
  RED = "#FF0000",
  GREEN = "#00FF00",
  BLUE = "#0080FF",
  WHITE = "#FFFFFF",
  PINK = "#FF00FF",
}

const range = (overrides?: {
  name?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) => {
  return {
    name: "Range",
    type: "range" as const,
    value: 1,
    min: 0,
    max: 100,
    step: 1,
    suffix: "",
    ...overrides,
  };
};

const paperTexture = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Paper Texture",
    type: "paper_texture" as const,
    value: "grey",
    ...overrides,
  };
};

const boolean = (overrides?: { name?: string; value?: boolean }) => {
  return {
    name: "Boolean",
    type: "boolean" as const,
    value: true,
    ...overrides,
  };
};

const colour = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Colour",
    type: "color" as const,
    value: "#FFFFFF",
    ...overrides,
  };
};

const text = (overrides?: {
  name?: string;
  value?: string;
  placeholder?: string;
}) => {
  return {
    name: "Text",
    type: "text" as const,
    value: "Lorem ipsum",
    ...overrides,
  };
};

const textArea = (overrides?: {
  name?: string;
  value?: string;
  rows?: number;
}) => {
  return {
    name: "Textarea",
    type: "textarea" as const,
    value: "Lorem ipsum",
    rows: 4,
    ...overrides,
  };
};

const fontPicker = (overrides?: { name?: string; value?: FontFamily }) => {
  return {
    name: "Font Picker",
    type: "font_picker" as const,
    value: FontFamily.SERIF,
    ...overrides,
  };
};

const inkSelector = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Ink Color",
    type: "ink_color" as const,
    value: "ink-black",
    ...overrides,
  };
};

const imageFilter = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Image Filter",
    type: "image_filter" as const,
    value: "none",
    ...overrides,
  };
};

const textAlign = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Text Align",
    type: "text_align" as const,
    value: "text-justify",
    ...overrides,
  };
};

const imageInput = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Image Input",
    type: "image_input" as const,
    value: "",
    ...overrides,
  };
};

const fontWeightPicker = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Font Weight",
    type: "font_weight_picker" as const,
    value: "font-normal",
    ...overrides,
  };
};

const paragraphArray = (overrides?: { name?: string }) => {
  return {
    name: "Paragraph Array",
    type: "paragraph_array" as const,
    ...overrides,
  };
};

const select = (overrides?: {
  name?: string;
  value?: string;
  options?: Array<{ label: string; value: string }>;
}) => {
  return {
    name: "Select",
    type: "select" as const,
    value: "",
    options: [],
    ...overrides,
  };
};

const blendMode = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Blend Mode",
    type: "blend_mode" as const,
    value: "blend-mode-normal",
    ...overrides,
  };
};

const crtPixelColours = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "CRT Pixel Colour",
    type: "crt_pixel_colours" as const,
    value: CrtScreenTextColor.GREEN,
    ...overrides,
  };
};

const fontSize = () =>
  range({ name: "Font Size", min: 16, max: 200, suffix: "px" });
const lineHeight = () =>
  range({ name: "Line Height", min: 0, max: 4, step: 0.1, suffix: "em" });
const rotation = () =>
  range({ name: "Rotation", min: -60, max: 60, suffix: "°" });
const zoom = () => range({ name: "Zoom", min: -0.1, max: 6, step: 0.05 });

type ConfigTuple = [
  any,
  (
    | ReturnType<typeof range>
    | ReturnType<typeof paperTexture>
    | ReturnType<typeof boolean>
    | ReturnType<typeof colour>
    | ReturnType<typeof text>
    | ReturnType<typeof textArea>
    | ReturnType<typeof fontPicker>
    | ReturnType<typeof colour>
    | ReturnType<typeof textAlign>
    | ReturnType<typeof imageFilter>
    | ReturnType<typeof imageInput>
    | ReturnType<typeof inkSelector>
    | ReturnType<typeof fontWeightPicker>
    | ReturnType<typeof paragraphArray>
    | ReturnType<typeof select>
    | ReturnType<typeof blendMode>
    | ReturnType<typeof crtPixelColours>
  )
];

type HandoutConfig = {
  [key: string]: ConfigTuple | HandoutConfig;
};

export type ExtractConfigValues<T> = T extends readonly [infer Value, any]
  ? Value
  : T extends object
  ? { [K in keyof T]: ExtractConfigValues<T[K]> }
  : never;

const imageOpts = {
  image: {
    saturation: [
      100,
      range({ name: "Saturation", min: 0, max: 1000, suffix: "%", step: 5 }),
    ],
    hue_rotation: [
      0,
      range({ name: "Hue Rotation", min: 0, max: 360, suffix: "°", step: 2 }),
    ],
    brightness: [
      100,
      range({ name: "Brightness", min: 0, max: 1000, suffix: "%", step: 5 }),
    ],
    scaleX: [1, range({ name: "Scale X", min: 0.1, max: 10, step: 0.1 })],
    scaleY: [1, range({ name: "Scale Y", min: 0.1, max: 10, step: 0.1 })],
  },
} satisfies HandoutConfig;

const imageOptsWithoutScaling = {
  image: {
    saturation: [
      100,
      range({ name: "Saturation", min: 0, max: 1000, suffix: "%", step: 5 }),
    ],
    hue_rotation: [
      0,
      range({ name: "Hue Rotation", min: 0, max: 360, suffix: "°", step: 2 }),
    ],
    brightness: [
      100,
      range({ name: "Brightness", min: 0, max: 1000, suffix: "%", step: 5 }),
    ],
  },
} satisfies HandoutConfig;

export const NewspaperConfig = {
  positioning: {
    rotationDegrees: [
      0,
      range({ name: "Rotation", min: -60, max: 60, suffix: "°" }),
    ],
    zoom: [1, range({ name: "Zoom", min: -0.1, max: 6, step: 0.05 })],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  pageWidthPercentage: [
    60,
    range({ name: "Page Width", min: 10, max: 300, suffix: "%" }),
  ],
  paperTexture: ["grey", paperTexture()],
  paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
  inkColor: ["ink-black", inkSelector()],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  title: {
    title: ["THE LOREM IPSUM", text({ name: "Title" })],
    titleFont: [FontFamily.SANS, fontPicker()],
    titleFontSize: [34, fontSize()],
    lineHeight: [3, lineHeight()],
    topMargin: [
      0,
      range({ name: "Top Margin", min: -100, max: 100, suffix: "px" }),
    ],
    bottomMargin: [
      0,
      range({ name: "Bottom Margin", min: -100, max: 100, suffix: "px" }),
    ],
  },
  bannerTexts: {
    bannerText1: ["Integer a egestas", text({ name: "Text 1" })],
    bannerText2: ["Duis sodales", text({ name: "Text 2" })],
    bannerText3: ["Quisque imperdiet", text({ name: "Text 3" })],
    bannerFont: [FontFamily.SANS, fontPicker()],
    bannerSize: [16, fontSize()],
    hideTopBannerBorder: [false, boolean({ name: "Hide top border" })],
    hideBottomBannerBorder: [false, boolean({ name: "Hide bottom border" })],
  },
  headline: {
    headline: [
      "ALIQUAM EROS AUGUE, COMMODO EGET RHONCUS NEC!",
      text({ name: "Headline" }),
    ],
    headlineFont: [FontFamily.SANS, fontPicker()],
    headlineFontSize: [34, fontSize()],
  },
  quote: {
    quote: [
      "Maecenas molestie ac, erat sed ultrices. Ut in vehicula est, ut malesuada eros! Nunc condimentum, aliquet ante nec venenatis",
      text({ name: "Quote/Call-out" }),
    ],
    quoteFont: [FontFamily.SANS, fontPicker()],
    quoteFontSize: [20, fontSize()],
  },
  mainCopy: {
    mainCopyContent: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.`,
      textArea({ name: "Main copy", rows: 20 }),
    ],
    mainCopyColumns: [3, range({ name: "Columns", min: 1, max: 5 })],
    imageFilter: ["none", imageFilter()],
    isMainCopyBlurry: [false, boolean({ name: "Blurry main copy" })],
    textAlign: ["text-justify", textAlign()],
  },
} satisfies HandoutConfig;

export const NewspaperClippingConfig = {
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
  },
  dimensions: {
    pageWidth: [
      400,
      range({ name: "Page Width", min: 100, max: 1800, suffix: "px" }),
    ],
    pageHeight: [
      700,
      range({ name: "Page Height", min: 100, max: 1200, suffix: "px" }),
    ],
  },
  paper: {
    paperTexture: ["grey", paperTexture()],
    paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
    isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  },
  prefix_copy: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius vestibulum porttitor. Donec egestas egestas commodo. Nullam tincidunt, felis ut rutrum rhoncus, nunc metus mattis arcu, sit amet vulputate velit nunc in metus. Nullam lacinia mauris id mauris semper malesuada.",
    textArea({ name: "Prefix Copy" }),
  ],
  isPrefixBlurry: [true, boolean({ name: "Is Prefix Blurry?" })],
  mainCopy: [
    "Curabitur eu tellus et nibh ornare ornare non nec nibh. Etiam sapien enim, suscipit et fermentum id, aliquet iaculis ipsum. Mauris pharetra congue",
    textArea({ name: "Main Copy" }),
  ],
  suffix_copy: [
    "Phasellus aliquam arcu sed risus imperdiet, non tempus nisl egestas.",
    textArea({ name: "Suffix Copy" }),
  ],
  isSuffixBlurry: [true, boolean({ name: "Is Suffix Blurry?" })],
  font: [FontFamily.SERIF, fontPicker()],
  inkColor: ["ink-black", inkSelector()],
  imageFilter: ["none", imageFilter()],
} satisfies HandoutConfig;

export const CharacterCardConfig = {
  positioning: {
    // rotationDegrees: [
    //   0,
    //   range({ name: "Rotation", min: -60, max: 60, suffix: "°" }),
    // ],
    zoom: [1, range({ name: "Zoom", min: -0.1, max: 6, step: 0.05 })],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  pageWidth: [
    700,
    range({ name: "Page Width", min: 100, max: 1500, suffix: "px" }),
  ],
  paperTexture: ["beige-3", paperTexture()],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  imageUrl: [
    "https://i.pinimg.com/564x/49/c1/4d/49c14d528399386e820dd116a25590b2.jpg",
    imageInput(),
  ],
  inkColor: ["ink-black", inkSelector()],
  imageFilter: ["none", imageFilter()],
  textLineOne: [
    "Lorem Ipsum",
    text({ name: "Line 1", placeholder: "Lorem Ipsum" }),
  ],
  textLineTwo: [
    "Lorem Ipsum",
    text({ name: "Line 2", placeholder: "Lorem Ipsum" }),
  ],
  textLineThree: [
    "Lorem Ipsum",
    text({ name: "Line 3", placeholder: "Lorem Ipsum" }),
  ],
  font: [FontFamily.SERIF, fontPicker()],
  fontSize: [
    24,
    range({ name: "Font Size (Relative)", min: 16, max: 100, suffix: "%" }),
  ],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textAlign: ["text-left", textAlign()],
} satisfies HandoutConfig;

export const PlainLetterConfig = {
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  pageWidth: [
    850,
    range({ name: "Page Width", min: 100, max: 1500, suffix: "px" }),
  ],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  paperTexture: ["grey", paperTexture()],
  paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
  inkColor: ["ink-black", inkSelector()],
  padding: [50, range({ name: "Padding", min: 0, max: 100, suffix: "px" })],
  paragraph: [
    [
      {
        id: nanoid(),
        mainCopy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

## Pellentesque nisl ipsum, sodales at velit sit amet, tempor sagittis orci. 

Nullam cursus congue magna, pulvinar commodo massa ornare quis. Etiam eleifend fermentum mauris at aliquet. Aliquam ac augue nunc. 

Mauris mollis bibendum erat, et ultrices tortor pellentesque vitae. 

# Suspendisse sed accumsan augue.

Mauris orci tortor, semper nec purus ac, rhoncus mollis massa. Cras euismod dignissim libero ut luctus. Ut mattis ut tellus quis aliquet. In hac habitasse platea dictumst.          
`,
        font: FontFamily.SERIF,
        fontSize: 12,
        fontWeight: FontWeight.NORMAL,
        textAlign: "text-left",
      },
    ],
    paragraphArray({ name: "Paragraphs" }),
  ],
  paragraphGap: [
    0,
    range({ name: "Paragraph Gap", min: 0, max: 100, suffix: "px" }),
  ],
} satisfies HandoutConfig;

export const BookCoverConfig = {
  bookCoverTemplate: [
    "/images/book-cover-1.avif",
    select({
      name: "Book Cover Template",
      value: "/images/book-cover-1.avif",
      options: [
        { label: "Book Cover 1", value: "/images/book-cover-1.avif" },
        { label: "Book Cover 2", value: "/images/book-cover-2.avif" },
        { label: "Book Cover 3", value: "/images/book-cover-3.png" },
        { label: "Book Cover 4", value: "/images/book-cover-4.png" },
      ],
    }),
  ],
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  inkColor: [InkColor.BLACK, inkSelector({ value: InkColor.BLACK })],
  font: [FontFamily.SERIF, fontPicker()],
  fontSize: [
    30,
    range({ name: "Font Size (Relative)", min: 1, max: 100, suffix: "px" }),
  ],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textLeftMargin: [
    13,
    range({ name: "Text Left Margin", min: -100, max: 100, suffix: "px" }),
  ],
  textAlign: ["text-center", textAlign({ value: "text-center" })],
  textEffect: ["blend-mode-normal", blendMode({ name: "Text Effect" })],
  mainCopy: [
    `# MYSTICAL ARTIFACTS

## A STUDY IN THE STRANGE AND WEIRD

### A. COBALT ET.AL`,
    textArea({
      name: "Main Copy",
      value: `# MYSTICAL ARTIFACTS

## A STUDY IN THE STRANGE AND WEIRD

### A. COBALT ET.AL`,
      rows: 8,
    }),
  ],
} satisfies HandoutConfig;

export const LabelledLiquidConfig = {
  imageTemplate: [
    "/images/labelled-container-1.avif",
    select({
      name: "Image Template",
      value: "/images/labelled-container-1.avif",
      options: [
        {
          label: "Round Bottle w/ Stopper",
          value: "/images/labelled-container-1.avif",
        },
        { label: "Potion 2", value: "/images/labelled-container-2.avif" },
        {
          label: "Jar w/ Green Stuff",
          value: "/images/labelled-container-3.avif",
        },
        { label: "Blue Bottle", value: "/images/labelled-container-4.avif" },
        {
          label: "Blue Bottle Alt",
          value: "/images/labelled-container-5.avif",
        },
        { label: "Potion 6", value: "/images/labelled-container-6.avif" },
      ],
    }),
  ],
  imageHueFilter: [
    0,
    range({ name: "Image Hue Filter (Rotate)", min: 0, max: 90, suffix: "°" }),
  ],
  imageWidth: [
    400,
    range({ name: "Image Width", min: 100, max: 1000, step: 2, suffix: "px" }),
  ],
  imageRotation: [
    0,
    range({ name: "Image Rotation", min: -90, max: 90, suffix: "°" }),
  ],
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  inkColor: [InkColor.BLACK, inkSelector({ value: InkColor.BLACK })],
  font: [FontFamily.SERIF, fontPicker()],
  fontSize: [
    12,
    range({
      name: "Font Size (Relative)",
      min: 1,
      max: 100,
      step: 0.1,
      suffix: "px",
    }),
  ],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textTopMargin: [
    90,
    range({ name: "Text Top Margin", min: -100, max: 250, suffix: "%" }),
  ],
  textLeftMargin: [
    65,
    range({ name: "Text Left Margin", min: -100, max: 100, suffix: "px" }),
  ],
  textWidth: [
    56,
    range({ name: "Text Width", min: -100, max: 150, suffix: "%" }),
  ],
  textRotation: [
    0,
    range({ name: "Text Rotation", min: -90, max: 90, suffix: "°" }),
  ],
  textAlign: ["text-center", textAlign({ value: "text-center" })],
  textEffect: ["blend-mode-normal", blendMode({ name: "Text Effect" })],
  mainCopy: [
    `# LOVE POTION No. 9
      
### _Elixer Sue_`,
    textArea({
      name: "Main Copy",
      value: `# LOVE POTION No. 9
      
### _Elixer Sue_`,
      rows: 4,
    }),
  ],
} satisfies HandoutConfig;

export const HangingWoodenSignConfig = {
  text: [
    `# GO AWAY
_We don't want any!_`,
    textArea({ name: "Text" }),
  ],
  yOffset: [50, range({ name: "Y-Offset", min: -200, max: 300, suffix: "px" })],
  textWidth: [
    600,
    range({ name: "Text Width", min: 100, max: 1500, suffix: "px" }),
  ],
  font: [FontFamily.SERIF, fontPicker()],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  fontSize: [36, range({ name: "Font Size", min: 16, max: 200, suffix: "px" })],
  textAlign: ["text-center", textAlign({ value: "text-center" })],
  gnarledText: [false, boolean({ name: "Gnarled Text" })],
  ...imageOpts,
} satisfies HandoutConfig;

export const ThreePanelDirectionalSignConfig = {
  panel1: {
    text: ["Baldur's Gate", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      58,
      range({ name: "Font Size", min: 16, max: 200, suffix: "px" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      0,
      range({ name: "X-Offset", min: -200, max: 300, suffix: "px" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -200, max: 300, suffix: "px" }),
    ],
  },
  panel2: {
    text: ["Waterdeep", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      48,
      range({ name: "Font Size", min: 16, max: 200, suffix: "px" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      0,
      range({ name: "X-Offset", min: -200, max: 300, suffix: "px" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -200, max: 300, suffix: "px" }),
    ],
  },
  panel3: {
    text: ["Neverwinter", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      48,
      range({ name: "Font Size", min: 16, max: 200, suffix: "px" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      0,
      range({ name: "X-Offset", min: -200, max: 300, suffix: "px" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -200, max: 300, suffix: "px" }),
    ],
  },
  ...imageOpts,
} satisfies HandoutConfig;

export const CrtScreenConfig = {
  text: [
    `Class aptent taciti sociosqu ad litora torquent per conubia nostra,
per inceptos himenaeos. Integer fringilla nulla eu sem rhoncus

Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc. Nullam
et quam vel urna mollis fermentum sit amet vehicula nisi. Donec ut
commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet
porta

quis maximus orci mollis nec. Nulla gravida nisl sed elementum mollis.
Nam efficitur lacus tellus. Nam faucibus efficitur sem quis pulvinar.
Donec elit augue, feugiat quis ornare aliquet, facilisis vel lacus.
Mauris porta metus in velit lobortis ornare. Vestibulum ante ipsum
primis in faucibus orci lu

Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc. Nullam
et quam vel urna mollis fermentum sit amet vehicula nisi. Donec ut
commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet
porta

Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc. Nullam
et quam vel urna mollis fermentum sit amet vehicula nisi. Donec ut
commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet
porta

Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc. Nullam
et quam vel urna mollis fermentum sit amet vehicula nisi. Donec ut
commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet
porta

Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc. Nullam
et quam vel urna mollis fermentum sit amet vehicula nisi. Donec ut
commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet
porta`,
    textArea({ name: "Text", rows: 20 }),
  ],
  crtPixelColor: [
    CrtScreenTextColor.GREEN,
    crtPixelColours({ name: "CRT Screen Text Colour" }),
  ],
  textGlow: [true, boolean({ name: "Text Glow" })],
  fontSize: [24, range({ name: "Font Size", min: 6, max: 100, suffix: "px" })],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textAlign: ["text-left", textAlign()],

  crtScreen: [
    "/images/crts/c.webp",
    select({
      name: "CRT Screen Style/Model",
      value: "/images/crts/c.webp",
      options: [
        // { label: "HP", value: "/images/crts/a.webp" },
        { label: "Commodore PET", value: "/images/crts/c.webp" },
        { label: "Apple Macintosh", value: "/images/crts/b.webp" },
      ],
    }),
  ],
  ...imageOptsWithoutScaling,
} satisfies HandoutConfig;

export const allConfigs = [
  {
    name: "Newspaper",
    displayName: "Newspaper (Front Page)",
    caption:
      "A newspaper, with markdown-configurable title, banners, headline, call-out and copy. Make the copy blurry for a more dramatic effect.",
    type: "digital_paper",
    config: NewspaperConfig,
  } as const,
  {
    name: "NewspaperClipping",
    displayName: "Newspaper Clipping (Vertical)",
    caption:
      "A simplified version of a newspaper 'clipping' - a classic vertical slice.",
    type: "digital_paper",
    config: NewspaperClippingConfig,
  } as const,
  {
    name: "CharacterCard",
    displayName: "Character Card",
    caption: "An easy-to-use character card. A picture with 3 lines of text.",
    type: "digital_paper",
    config: CharacterCardConfig,
  } as const,
  {
    name: "PlainLetter",
    displayName: "Plain Letter",
    caption:
      "A simple plain sheet of paper. Completely configurable via markdown.",
    type: "digital_paper",
    config: PlainLetterConfig,
  } as const,
  {
    name: "BookCover",
    displayName: "Book Cover",
    caption: "A book cover, with markdown-configurable cover text",
    type: "object",
    config: BookCoverConfig,
  } as const,
  {
    name: "LabelledLiquid",
    displayName: "Labelled Liquid",
    caption: "A bottle, vial, or other labelled liquid",
    type: "object",
    config: LabelledLiquidConfig,
  } as const,
  {
    name: "HangingWoodenSign",
    displayName: "Hanging Wooden Sign",
    caption: "A hanging wooden sign, with markdown-configurable text",
    type: "wooden_signs",
    config: HangingWoodenSignConfig,
  },
  {
    name: "ThreePanelDirectionalSign",
    displayName: "3 Panel Directional Wooden Sign",
    caption:
      "A three-panel directional wooden sign with customizable text on each panel",
    type: "wooden_signs",
    config: ThreePanelDirectionalSignConfig,
  },
  {
    name: "CrtScreen",
    displayName: "CRT Screen",
    caption: "A CRT screen, with markdown-configurable text",
    type: "scifi_screens",
    config: CrtScreenConfig,
  },
];

// make a type of the all config > type
export type AllConfigNames = (typeof allConfigs)[number]["name"];

export function extractConfigAsData(
  config: HandoutConfig
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value) && value.length === 2) {
      // It's a ConfigTuple, extract the first element (the value)
      result[key] = value[0];
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // It's a nested HandoutConfig, recurse
      result[key] = extractConfigAsData(value as HandoutConfig);
    }
  }

  return result;
}

export function extractConfigAsFormConfig(
  config: HandoutConfig,
  parentPath: string = ""
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(config)) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    if (Array.isArray(value) && value.length === 2) {
      // It's a ConfigTuple, create the mini object
      result[key] = {
        inputConfig: value[1],
        path: currentPath,
      };
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // It's a nested HandoutConfig, recurse
      result[key] = extractConfigAsFormConfig(
        value as HandoutConfig,
        currentPath
      );
    }
  }

  return result;
}

// we're going to store "handouts"
// each handout is going to have a type and a data attribute

type HandoutTable = {
  id: string;
  type: string;
  data: any;
};

type VersionTable = {
  id: string;
  handoutType: string;
  data: any;
  timestamp: number;
  createdAt: Date;
};

type AppConfigTable = {
  id: string;
  appVersion: number;
  selectedHandoutType: AllConfigNames;
  selectedVersionId: string | undefined;
  updatedAt: Date;
};

export const db = new Dexie("handoutsdb") as Dexie & {
  handouts: EntityTable<HandoutTable, "id">;
  versions: EntityTable<VersionTable, "id">;
  appConfig: EntityTable<AppConfigTable, "id">;
};

db.version(APP_VERSION).stores({
  handouts: "++id, type, data",
  versions: "++id, handoutType, timestamp, createdAt",
  appConfig:
    "id, appVersion, selectedHandoutType, selectedVersionId, updatedAt",
});

// Check version and reset database if needed
async function checkAndResetDatabase() {
  try {
    const config = await db.appConfig.get("APP_CONFIG");
    if (config && config.appVersion !== APP_VERSION) {
      console.log(
        `Database version mismatch. Current: ${config.appVersion}, Expected: ${APP_VERSION}. Resetting database.`
      );
      await db.delete();
      await db.open();
    }
  } catch (error) {
    // If there's any error accessing the config, just continue
    console.log(
      "Error checking database version, continuing with existing database:",
      error
    );
  }
}

// Initialize app state from database
async function initializeAppState() {
  await checkAndResetDatabase();

  try {
    const config = await db.appConfig.get("APP_CONFIG");
    if (config) {
      appState.selectedHandoutType = config.selectedHandoutType;
      appState.selectedVersionId = config.selectedVersionId;
    } else {
      // Create default config
      await saveAppConfig();
    }
  } catch (error) {
    console.log("Error loading app config, using defaults:", error);
    await saveAppConfig();
  }
}

// Save current app state to database
export async function saveAppConfig() {
  try {
    await db.appConfig.put({
      id: "APP_CONFIG",
      appVersion: APP_VERSION,
      selectedHandoutType: appState.selectedHandoutType,
      selectedVersionId: appState.selectedVersionId,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log("Error saving app config:", error);
  }
}

// Initialize database with transient handouts
async function initializeDatabase() {
  await initializeAppState();

  // for each handout, add a transient handout
  for (const config of allConfigs) {
    try {
      await db.handouts.add({
        id: `TRANSIENT_${config.name}`,
        type: config.name,
        data: extractConfigAsData(config.config),
      });
    } catch (error) {
      // Ignore errors for already existing transient records
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      if (!errorMessage.includes("already exists")) {
        console.log(`Error adding transient handout ${config.name}:`, error);
      }
    }
  }
}

// Start database initialization
initializeDatabase();

export const getLatestVersion = async (handoutType: string) => {
  const versions = await db.versions
    .where("handoutType")
    .equals(handoutType)
    .reverse()
    .toArray();

  return versions[0];
};

/**
 * we then keep an app state that is transient for things that dont belong in the db, like
 * which handout type is selected
 */
export const appState = proxy<{
  selectedHandoutType: AllConfigNames;
  selectedVersionId: string | undefined;
}>({
  selectedHandoutType: allConfigs[0].name,
  // selectedVersionId: latestVersionOfFirstHandout?.id ?? undefined,
  selectedVersionId: "TRANSIENT",
});

// Auto-save app state changes to database
subscribe(appState, () => {
  saveAppConfig();
});

export const saveVersion = async (handoutType: string, data: any) => {
  const newVersion: VersionTable = {
    id: nanoid(),
    handoutType,
    data: {
      ...data,
    },
    timestamp: Date.now(),
    createdAt: new Date(),
  };

  await db.versions.add(newVersion);

  // update the app state to the latest version
  appState.selectedVersionId = newVersion.id;
};

export const updateTransientRecordToVersion = async (versionId: string) => {
  const version = await db.versions.get(versionId);
  if (version) {
    await updateTransientRecord(version.handoutType, version.data);
    appState.selectedVersionId = versionId;
  }
};
export const updateTransientRecord = async (handoutType: string, data: any) => {
  // dont update the id tho
  await db.handouts
    .where("id")
    .equals(`TRANSIENT_${handoutType}`)
    .modify({
      data: {
        ...data,
        id: `TRANSIENT_${handoutType}`,
      },
    });
};

// Export the version table type for use in other components
export type { VersionTable };

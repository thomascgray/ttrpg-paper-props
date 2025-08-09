import { nanoid } from "nanoid";
import { FontFamily, FontWeight, InkColor, CrtScreenTextColor } from "./enums";
import { HandoutConfig } from "./types";
import {
  range,
  paperTexture,
  boolean,
  colour,
  text,
  textArea,
  fontPicker,
  inkSelector,
  imageFilter,
  textAlign,
  imageInput,
  fontWeightPicker,
  paragraphArray,
  select,
  blendMode,
  crtPixelColours,
  fontSize,
  lineHeight,
  rotation,
  zoom,
  imageOpts,
  legendItems,
  positioning,
  positioningNamed,
  textFull,
  imagePostProcessing,
  x_y_position,
} from "./inputHelpers";
import { LegendItem } from "./components/LegendItems";

export const NewspaperConfig = {
  ...positioning,
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
  ...positioning,
  text: [
    `per conubia nostra, per inceptos himenaeos. Integer fringilla nulla eu sem rhoncus. Fusce ante velit, imperdiet id eros ut, eleifend sodales nunc.

### GET TO THE ESCAPE PODS!

_Nullam et quam vel urna mollis fermentum sit amet vehicula nisi._ Donec ut commodo sem. Nulla facilisi. Nulla facilisi. In aliquam imperdiet porta`,
    textArea({ name: "Text" }),
  ],
  crtPixelColor: [
    CrtScreenTextColor["1"],
    crtPixelColours({ name: "CRT Screen Text Colour" }),
  ],
  textGlow: [true, boolean({ name: "Text Glow" })],
  fontSize: [18, range({ name: "Font Size", min: 6, max: 100, suffix: "px" })],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textAlign: ["text-center", textAlign()],
  // bulgeScale: [80, range({ name: "Bulge Scale", min: 0, max: 400 })],
  crtScreen: [
    "/images/crts/c.webp",
    select({
      name: "CRT Screen Style/Model",
      value: "/images/crts/c.webp",
      options: [
        // { label: "HP", value: "/images/crts/a.webp" },
        { label: "Commodore PET (c.webp)", value: "/images/crts/c.webp" },
        { label: "Apple Macintosh (b.webp)", value: "/images/crts/b.webp" },
        { label: "Apple Lisa 2 (d.webp)", value: "/images/crts/d.webp" },
        {
          label: "Micral Microcomputer (e.webp)",
          value: "/images/crts/e.webp",
        },
      ],
    }),
  ],
  ...imagePostProcessing,
} satisfies HandoutConfig;

export const PaperMapConfig = {
  ...positioningNamed({ key: "mapPositioning", name: "Map" }),
  ...positioningNamed({
    key: "legendPositioning",
    name: "Legend",
    defaults: { zoom: 1.2, xOffset: -50, yOffset: -30 },
    ranges: {
      zoom: { min: 0.5, max: 3, step: 0.05 },
      xOffset: { min: -100, max: 100 },
      yOffset: { min: -100, max: 100 },
    },
  }),
  paperTexture: ["beige-3", paperTexture()],
  image: ["https://i.imgur.com/w1DaJ2q.jpeg", imageInput()],
  legend: {
    legendItems: [[] as LegendItem[], legendItems({ name: "Legend Items" })],
    legendPosition: [
      "top-left",
      select({
        name: "Legend Position",
        options: [
          { label: "Top Left", value: "top-left" },
          { label: "Top Center", value: "top-center" },
          { label: "Top Right", value: "top-right" },
          { label: "Middle Left", value: "middle-left" },
          { label: "Middle Right", value: "middle-right" },
          { label: "Bottom Left", value: "bottom-left" },
          { label: "Bottom Center", value: "bottom-center" },
          { label: "Bottom Right", value: "bottom-right" },
        ],
      }),
    ],
    font: [FontFamily.SERIF, fontPicker()],
    fontSize: [
      24,
      range({ name: "Font Size", min: 16, max: 100, suffix: "px" }),
    ],
    fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  },
  imageFilter: ["none", imageFilter()],
} satisfies HandoutConfig;

export const SciFiHologramConfig = {
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  image: ["https://i.imgur.com/GKTWuW2.png", imageInput()],
  overlayColor: ["#456099", colour({ name: "Overlay Color" })],
  warbleEffect: [true, boolean({ name: "Warble Effect" })],
  blendEffect: [
    "blend-mode-darken",
    select({
      name: "Blend Effect",
      value: "blend-mode-darken",
      options: [
        { label: "Darkest", value: "blend-mode-color-burn" },
        { label: "Darker", value: "blend-mode-darken" },
        { label: "Normal", value: "blend-mode-overlay" },
        { label: "Lighter", value: "blend-mode-soft-light" },
        { label: "Lightest", value: "blend-mode-color-dodge" },
      ],
    }),
  ],
  scanlines: {
    opacity: [
      0.8,
      range({ name: "Scanline Opacity", min: 0, max: 1, step: 0.1 }),
    ],
    size: [2, range({ name: "Scanline Size", min: 0, max: 10, step: 1 })],
  },
  isTransparent: [false, boolean({ name: "Is Transparent" })],
  isFadeOut: [false, boolean({ name: "Is Fade Out" })],
} satisfies HandoutConfig;

export const PolaroidConfig = {
  ...positioning,
  paperTexture: ["none", paperTexture()],
  imageUrl: [
    "https://static.wikia.nocookie.net/chrisnolan/images/3/3c/Leonard.jpg",
    imageInput(),
  ],
  ...imagePostProcessing,
  captionText: {
    ...textFull({
      text: {
        default: "DON'T BELIEVE HIS LIES",
        name: "Caption Text",
        placeholder: "Enter caption...",
      },
      font: { default: FontFamily.CAVEAT },
      fontSize: { default: 32 },
      textAlign: { default: "text-center" },
      textStyle: { default: "", name: "Caption Style" },
    }),
  },
  showPin: [false, boolean({ name: "Show Pin" })],
  showPaperclip: [true, boolean({ name: "Show Paperclip" })],
  showStack: [false, boolean({ name: "Show Stack" })],
} satisfies HandoutConfig;

export const CrystalBallConfig = {
  ...positioning,
  image: [
    "https://preview.redd.it/is-this-art-from-the-forgotten-realms-setting-if-so-what-v0-2284un21kjxd1.jpeg?width=640&crop=smart&auto=webp&s=eb5425ef0152e95199ce70b0fc76f603c321f27c",
    imageInput(),
  ],
  ...imagePostProcessing,
  showGlare: [true, boolean({ name: "Show Glare" })],
  showDirectionalLight: [true, boolean({ name: "Show Directional Light" })],
  pos: [{ x: 0, y: 0 }, x_y_position()],
} satisfies HandoutConfig;

export const TestConfig = {
  ...positioning,
  scale: [1, range({ name: "Scale", min: 0, max: 500, step: 5 })],
  xRotate: [1, range({ name: "X Rotation", min: -360, max: 360 })],
  yRotate: [1, range({ name: "Y Rotation", min: -360, max: 360 })],
  zRotate: [1, range({ name: "Z Rotation", min: -360, max: 360 })],
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
  } as const,
  {
    name: "ThreePanelDirectionalSign",
    displayName: "3 Panel Directional Wooden Sign",
    caption:
      "A three-panel directional wooden sign with customizable text on each panel",
    type: "wooden_signs",
    config: ThreePanelDirectionalSignConfig,
  } as const,
  {
    name: "CrtScreen",
    displayName: "CRT Screen",
    caption: "A CRT screen, with markdown-configurable text",
    type: "scifi_screens",
    config: CrtScreenConfig,
  } as const,
  {
    name: "PaperMap",
    displayName: "Paper Map",
    caption: "A map, with markdown-configurable text",
    // type: "digital_paper", unhide when its done
    config: PaperMapConfig,
  } as const,
  {
    name: "SciFiHologram",
    displayName: "Sci-fi Hologram",
    caption: "A holographic display with customizable image and overlay color",
    type: "scifi_screens",
    config: SciFiHologramConfig,
  } as const,
  {
    name: "Polaroid",
    displayName: "Polaroid",
    caption: "A simple polaroid photo with text caption and optional pin",
    type: "digital_paper",
    config: PolaroidConfig,
  } as const,
  {
    name: "CrystalBall",
    displayName: "Crystal Ball",
    caption: "A mystical crystal ball with a single image",
    type: "object",
    config: CrystalBallConfig,
  } as const,
  {
    name: "Test",
    displayName: "Test",
    caption: "A test handout for development purposes",
    type: "test",
    config: TestConfig,
  } as const,
];

// make a type of the all config > type
export type AllConfigNames = (typeof allConfigs)[number]["name"];

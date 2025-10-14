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
  pageWidth: [
    90,
    range({ name: "Page Width", min: 50, max: 100, suffix: "cqw" }),
  ],
  paperTexture: ["grey", paperTexture()],
  paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
  inkColor: ["ink-black", inkSelector()],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  title: {
    title: ["THE LOREM IPSUM", text({ name: "Title" })],
    titleFont: [FontFamily.SANS, fontPicker()],
    titleFontSize: [
      4,
      range({
        name: "Title Font Size",
        min: 2,
        max: 8,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
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
    bannerSize: [
      1.2,
      range({
        name: "Banner Font Size",
        min: 0.8,
        max: 2,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
    hideTopBannerBorder: [false, boolean({ name: "Hide top border" })],
    hideBottomBannerBorder: [false, boolean({ name: "Hide bottom border" })],
  },
  headline: {
    headline: [
      "ALIQUAM EROS AUGUE, COMMODO EGET RHONCUS NEC!",
      text({ name: "Headline" }),
    ],
    headlineFont: [FontFamily.SANS, fontPicker()],
    headlineFontSize: [
      4,
      range({
        name: "Headline Font Size",
        min: 2,
        max: 8,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
  },
  quote: {
    quote: [
      "Maecenas molestie ac, erat sed ultrices. Ut in vehicula est, ut malesuada eros! Nunc condimentum, aliquet ante nec venenatis",
      text({ name: "Quote/Call-out" }),
    ],
    quoteFont: [FontFamily.SANS, fontPicker()],
    quoteFontSize: [
      2,
      range({
        name: "Quote Font Size",
        min: 1,
        max: 4,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
  },
  featureImage: {
    featureImageUrl: ["", imageInput({ name: "Feature Image" })],
    featureImageAlignment: [
      "left",
      select({
        name: "Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      }),
    ],
    isFeatureImageBlurry: [false, boolean({ name: "Blurry feature image" })],
    featureImageFilter: ["none", imageFilter()],
  },
  mainCopy: {
    mainCopyFontSize: [
      1,
      range({
        name: "Main Copy Font Size",
        min: 0.5,
        max: 2,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
    mainCopyContent: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.`,
      textArea({ name: "Main copy", rows: 20, maxRows: 40 }),
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
      60,
      range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" }),
    ],
    clippingTopPadding: [
      0,
      range({ name: "Clipping Top Padding", min: -20, max: 20 }),
    ],
    clippingBottomPadding: [
      0,
      range({
        name: "Clipping Bottom Padding",
        min: -20,
        max: 20,
      }),
    ],
  },
  paper: {
    paperTexture: ["grey", paperTexture()],
    paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
    isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  },
  prefixCopy: {
    content: [
      "am ut vehicula felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat consequat hendrerit. Morbi feugiat quis ipsum in mattis. Mauris faucibus volutpat nisl, et porta neque auctor quis. Donec non libero vel mi condimentum maximus non ac est. Proin elementum scelerisque tellus vitae luctus. Nam eu consectetur urna, nec bibendum risus. Duis consequat rhoncus leo. Donec in dignissim magna, a venenatis lorem. ",
      textArea({ name: "Prefix Copy" }),
    ],
    fontSize: [
      4,
      range({
        name: "Prefix Font Size",
        min: 0.8,
        max: 40,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
    isBlurry: [true, boolean({ name: "Is Prefix Blurry?" })],
  },
  mainCopy: {
    content: [
      "Nullam placerat, magna et tincidunt eleifend, enim justo fermentum ex, ac tempus tortor velit vitae metus. Etiam consectetur porttitor sem et egestas. Phasellus eu consequat quam. Aenean pretium ac sapien finibus fermentum. Pellentesque venenatis metus quam, eget convallis lorem ultricies ut. Quisque ultricies ligula at finibus fringilla. Nullam purus enim, auctor vitae erat nec, auctor accumsan dui. Praesent ut luctus augue, at aliquam n",
      textArea({ name: "Main Copy" }),
    ],
    fontSize: [
      4,
      range({
        name: "Main Copy Font Size",
        min: 1,
        max: 40,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
  },
  suffixCopy: {
    content: [
      "In eleifend quis massa sed vulputate. Donec egestas nisi vitae risus porttitor volutpat. Donec ultricies magna risus, pharetra tempus mi porttitor imperdiet. Curabitur dictum ultricies diam, a molestie lacus efficitur eget. Maecenas et massa vehicula, ornare enim tristique, pharetra tellus. Sed tincidunt condimentum euismod. Nam pelle",
      textArea({ name: "Suffix Copy" }),
    ],
    fontSize: [
      4,
      range({
        name: "Suffix Font Size",
        min: 0.8,
        max: 40,
        step: 0.1,
        suffix: "cqw",
      }),
    ],
    isBlurry: [true, boolean({ name: "Is Suffix Blurry?" })],
  },
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
  dimensions: {
    pageWidth: [
      35,
      range({ name: "Page Width", min: 20, max: 60, step: 1, suffix: "" }),
    ],
    pageHeight: [
      50,
      range({ name: "Page Height", min: 30, max: 80, step: 1, suffix: "" }),
    ],
  },
  paperTexture: ["beige-3", paperTexture()],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  imageUrl: ["/default_images/woody.png", imageInput()],
  inkColor: ["ink-black", inkSelector()],
  imageFilter: ["none", imageFilter()],
  lineOne: {
    content: [
      "Woody",
      text({ name: "Line 1 Text", placeholder: "Character Name" }),
    ],
    font: [FontFamily.SERIF, fontPicker({ name: "Line 1 Font" })],
    fontSize: [
      7,
      range({
        name: "Line 1 Font Size",
        min: 1,
        max: 20,
        step: 0.1,
        suffix: "",
      }),
    ],
    fontWeight: [FontWeight.BOLD, fontWeightPicker({ name: "Line 1 Weight" })],
    textAlign: ["text-center", textAlign({ name: "Line 1 Alignment" })],
  },
  lineTwo: {
    content: [
      "Town Sheriff",
      text({ name: "Line 2 Text", placeholder: "Title/Role" }),
    ],
    font: [FontFamily.SERIF, fontPicker({ name: "Line 2 Font" })],
    fontSize: [
      3.8,
      range({
        name: "Line 2 Font Size",
        min: 1,
        max: 20,
        step: 0.1,
        suffix: "",
      }),
    ],
    fontWeight: [
      FontWeight.NORMAL,
      fontWeightPicker({ name: "Line 2 Weight" }),
    ],
    textAlign: ["text-center", textAlign({ name: "Line 2 Alignment" })],
  },
  lineThree: {
    content: [
      "There's a snake in my boot!",
      text({ name: "Line 3 Text", placeholder: "Quote/Description" }),
    ],
    font: [FontFamily.SERIF, fontPicker({ name: "Line 3 Font" })],
    fontSize: [
      3.2,
      range({
        name: "Line 3 Font Size",
        min: 1,
        max: 20,
        step: 0.1,
        suffix: "",
      }),
    ],
    fontWeight: [FontWeight.LIGHT, fontWeightPicker({ name: "Line 3 Weight" })],
    textAlign: ["text-center", textAlign({ name: "Line 3 Alignment" })],
  },
} satisfies HandoutConfig;

export const PlainLetterConfig = {
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
    xOffset: [0, range({ name: "X-Offset", min: -100, max: 100, suffix: "%" })],
    yOffset: [0, range({ name: "Y-Offset", min: -100, max: 100, suffix: "%" })],
  },
  pageWidth: [50, range({ name: "Page Width", min: 20, max: 80, suffix: "" })],
  maintainAspectRatio: [true, boolean({ name: "Maintain Aspect Ratio" })],
  isPaperShadow: [true, boolean({ name: "Inset paper shadow" })],
  paperTexture: ["grey", paperTexture()],
  paperTint: ["#FFFFFF", colour({ name: "Paper Tint" })],
  inkColor: ["ink-black", inkSelector()],
  padding: [6, range({ name: "Padding", min: 0, max: 20, suffix: "cqw" })],
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
        fontSize: 1.4,
        fontWeight: FontWeight.NORMAL,
        textAlign: "text-left",
      },
    ],
    paragraphArray({ name: "Paragraphs" }),
  ],
  paragraphGap: [
    0,
    range({ name: "Paragraph Gap", min: 0, max: 10, suffix: "cqw" }),
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
  inkColor: [InkColor.BLACK, inkSelector({ value: InkColor.BLACK })],
  font: [FontFamily.SERIF, fontPicker()],
  fontSize: [
    3,
    range({
      name: "Font Size (Relative)",
      min: 0.1,
      max: 10,
      suffix: "%",
      step: 0.1,
    }),
  ],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
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
  dimensions: {
    pageWidth: [
      50,
      range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" }),
    ],
  },
  text: [
    `# GO AWAY
_We don't want any!_`,
    textArea({ name: "Text" }),
  ],
  textPosition: {
    top: [
      24,
      range({ name: "Top Position", min: 0, max: 50, step: 0.5, suffix: "" }),
    ],
    yOffset: [
      7,
      range({ name: "Y-Offset", min: -30, max: 30, step: 0.5, suffix: "" }),
    ],
  },
  font: [FontFamily.SERIF, fontPicker()],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  fontSize: [
    5,
    range({ name: "Font Size", min: 2, max: 15, step: 0.1, suffix: "cqw" }),
  ],
  textAlign: ["text-center", textAlign({ value: "text-center" })],
  gnarledText: [false, boolean({ name: "Gnarled Text" })],
  ...imageOpts,
} satisfies HandoutConfig;

export const ThreePanelDirectionalSignConfig = {
  dimensions: {
    pageWidth: [
      50,
      range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" }),
    ],
  },
  panel1: {
    text: ["Baldur's Gate", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      8,
      range({ name: "Font Size", min: 2, max: 20, step: 0.1, suffix: "cqw" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      2,
      range({ name: "X-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
  },
  panel2: {
    text: ["Waterdeep", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      6.8,
      range({ name: "Font Size", min: 2, max: 20, step: 0.1, suffix: "cqw" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      2,
      range({ name: "X-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
  },
  panel3: {
    text: ["Neverwinter", text({ name: "Text" })],
    font: [FontFamily.IM_FELL_DISPLAY, fontPicker()],
    fontWeight: [FontWeight.BOLD, fontWeightPicker()],
    fontSize: [
      6.8,
      range({ name: "Font Size", min: 2, max: 20, step: 0.1, suffix: "cqw" }),
    ],
    gnarledText: [true, boolean({ name: "Gnarled Text" })],
    xOffset: [
      2,
      range({ name: "X-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
    yOffset: [
      0,
      range({ name: "Y-Offset", min: -20, max: 30, step: 0.5, suffix: "" }),
    ],
  },
  ...imageOpts,
} satisfies HandoutConfig;

export const Rectangle1WoodenSignConfig = {
  dimensions: {
    pageWidth: [
      50,
      range({ name: "Page Width", min: 20, max: 100, step: 1, suffix: "" }),
    ],
  },
  text: [
    `# THE PRANCING PONY
_Inn & Tavern_`,
    textArea({ name: "Text" }),
  ],
  textPosition: {
    top: [
      28,
      range({ name: "Top Position", min: 0, max: 50, step: 0.5, suffix: "" }),
    ],
    yOffset: [
      7,
      range({ name: "Y-Offset", min: -30, max: 30, step: 0.5, suffix: "" }),
    ],
  },
  font: [FontFamily.SERIF, fontPicker()],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  fontSize: [
    5,
    range({ name: "Font Size", min: 2, max: 15, step: 0.1, suffix: "cqw" }),
  ],
  textAlign: ["text-center", textAlign({ value: "text-center" })],
  gnarledText: [false, boolean({ name: "Gnarled Text" })],
  ...imageOpts,
} satisfies HandoutConfig;

export const CrtScreenConfig = {
  positioning: {
    rotationDegrees: [0, rotation()],
    zoom: [1, zoom()],
  },
  dimensions: {
    pageWidth: [
      90,
      range({ name: "Page Width", min: 40, max: 120, step: 1, suffix: "" }),
    ],
  },
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
  bulgeEffect: [
    120,
    range({
      name: "Bulge Effect",
      min: 0,
      max: 250,
    }),
  ],
  fontSize: [
    2.5,
    range({
      name: "Font Size",
      min: 0.5,
      max: 8,
      step: 0.1,
      suffix: "cqw",
    }),
  ],
  fontWeight: [FontWeight.NORMAL, fontWeightPicker()],
  textAlign: ["text-center", textAlign()],
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
  image: ["/default_images/paper_map.jpeg", imageInput()],
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
  image: ["/default_images/darth.png", imageInput()],
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
  imageUrl: ["/default_images/Leonard.webp", imageInput()],
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
  image: ["/default_images/adventure_party.webp", imageInput()],
  ...imagePostProcessing,
  showGlare: [true, boolean({ name: "Show Glare" })],
  showDirectionalLight: [true, boolean({ name: "Show Directional Light" })],
  showShadowOnStand: [true, boolean({ name: "Show Shadow on Stand" })],
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
    name: "Rectangle1WoodenSign",
    displayName: "Rectangle 1",
    caption: "A rectangular wooden sign post with customizable text",
    type: "wooden_signs",
    config: Rectangle1WoodenSignConfig,
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

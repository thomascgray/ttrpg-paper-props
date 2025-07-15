import Dexie, { type EntityTable } from "dexie";
import { proxy } from "valtio";

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

const fontSize = () =>
  range({ name: "Font Size", min: 16, max: 200, suffix: "px" });

// again for line height
const lineHeight = () =>
  range({ name: "Line Height", min: 0, max: 4, step: 0.1, suffix: "em" });

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

const text = (overrides?: { name?: string; value?: string }) => {
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
  inkColor: ["#000000", inkSelector()],
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

export const NewspaperClippingConfig: HandoutConfig = {
  positioning: {
    rotationDegrees: [0, range()],
    zoom: [1, range()],
    xOffset: [0, range()],
    yOffset: [0, range()],
  },
  dimensions: {
    pageWidth: [400, range()],
    pageHeight: [700, range()],
  },
  paper: {
    paperTexture: ["grey", paperTexture()],
    paperTint: ["#FFFFFF", colour()],
    isPaperShadow: [true, boolean()],
  },
  prefix_copy: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius vestibulum porttitor. Donec egestas egestas commodo. Nullam tincidunt, felis ut rutrum rhoncus, nunc metus mattis arcu, sit amet vulputate velit nunc in metus. Nullam lacinia mauris id mauris semper malesuada.",
    textArea(),
  ],
  isPrefixBlurry: [true, boolean()],
  mainCopy: [
    "Curabitur eu tellus et nibh ornare ornare non nec nibh. Etiam sapien enim, suscipit et fermentum id, aliquet iaculis ipsum. Mauris pharetra congue",
    textArea(),
  ],
  suffix_copy: [
    "Phasellus aliquam arcu sed risus imperdiet, non tempus nisl egestas.",
    textArea(),
  ],
  isSuffixBlurry: [true, boolean()],
  font: [FontFamily.SERIF, fontPicker()],
  ink_color: ["#000000", colour()],
  image_filter: ["none", imageFilter()],
};

export const allConfigs = [
  {
    name: "Newspaper",
    caption:
      "A newspaper, with markdown-configurable title, banners, headline, call-out and copy. Make the copy blurry for a more dramatic effect.",
    type: "digital_paper",
    config: NewspaperConfig,
  } as const,
  {
    name: "Newspaper Clipping",
    caption:
      "A simplified version of a newspaper 'clipping' - a classic vertical slice.",
    type: "digital_paper",
    config: NewspaperClippingConfig,
  } as const,
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

export const db = new Dexie("handoutsdb") as Dexie & {
  handouts: EntityTable<HandoutTable, "id">;
};

db.version(1).stores({
  handouts: "++id, type, data",
});

// for each handout, add a transient handout
allConfigs.forEach((config) => {
  db.handouts.add({
    id: `TRANSIENT_${config.name}`,
    type: config.name,
    data: extractConfigAsData(config.config),
  });
});

/**
 * we then keep an app state that is transient for things that dont belong in the db, like
 * which handout type is selected
 */
export const appState = proxy({
  selectedHandoutType: allConfigs[0].name,
});

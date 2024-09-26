type iDataInputRange = {
  name: string;
  type: "range";
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
};

type iDataInputPlainText = {
  name: string;
  type: "input";
  value: string;
  placeholder?: string;
};

type iDataInputInkColorPicker = {
  name: string;
  type: "ink_color_picker";
  value: string;
};

type iDataInputFontPicker = {
  name: string;
  type: "font_picker";
  value: string;
};

type iDataInputBoolean = {
  name: string;
  type: "boolean";
  value: boolean;
};

type iDataInputPaperTexture = {
  name: string;
  type: "paper_texture";
  value: string;
};

export type tHandoutData =
  | iDataInputRange
  | iDataInputPlainText
  | iDataInputInkColorPicker
  | iDataInputFontPicker
  | iDataInputBoolean
  | iDataInputPaperTexture;

// make an interface that matches the NEWSPAPER below
// its an object with a name and a data
// and inside the data, each key is EITHER
// an input type, like a input or a range or an ink color picker
// OR its a nested object that has those input types

export type iHandoutDefinition = {
  name?: string;
  data: {
    [key: string]:
      | tHandoutData
      | {
          [key: string]: tHandoutData;
        };
  };
};

export const isHandoutData = (obj: any): obj is tHandoutData => {
  return obj.type !== undefined;
};

const _input: iDataInputPlainText = {
  name: "Title",
  value: "THE LOREM IPSUM",
  type: "input",
};
const _fontSizeRange: iDataInputRange = {
  name: "Font Size",
  type: "range",
  value: 34,
  min: 26,
  max: 200,
  step: 2,
  suffix: "px",
};
const _rotationDegrees: iDataInputRange = {
  name: "Rotation",
  type: "range",
  value: 0,
  min: -60,
  max: 60,
  step: 2,
  suffix: "°",
};
// universal data
const _zoom: iDataInputRange = {
  name: "Zoom",
  type: "range",
  value: 1,
  min: 0.1,
  max: 6,
  step: 0.1,
  suffix: "",
};
const _paperTexture: iDataInputPaperTexture = {
  name: "Paper Texture",
  type: "paper_texture",
  value: "grey",
};
const _isPaperShadow: iDataInputBoolean = {
  name: "Enable paper inset shadow?",
  type: "boolean",
  value: true,
};
const _xOffset: iDataInputRange = {
  name: "X Offset",
  type: "range",
  value: 0,
  min: -100,
  max: 100,
  step: 1,
  suffix: "px",
};
const _yOffset: iDataInputRange = {
  name: "Y Offset",
  type: "range",
  value: 0,
  min: -100,
  max: 100,
  step: 1,
  suffix: "px",
};
export const UNIVERSAL_DATA = {
  rotation_degrees: _rotationDegrees,
  zoom: _zoom,
  paper_texture: _paperTexture,
  is_paper_shadow: _isPaperShadow,
  x_offset: _xOffset,
  y_offset: _yOffset,
};

export const NEWSPAPER = {
  name: "Newspaper",
  data: {
    ...UNIVERSAL_DATA,
    page_width_percentage: {
      name: "Page Width",
      type: "range",
      value: 80,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-black",
    },
    title: {
      title: {
        name: "Title",
        value: "THE LOREM IPSUM",
        type: "input",
      },
      title_font: {
        name: "Font",
        value: "font-sans",
        type: "font_picker",
      },
      title_font_size: {
        ..._fontSizeRange,
      },
      line_height: {
        name: "Line Height",
        type: "range",
        value: 1,
        min: -5,
        max: 5,
        step: 0.1,
        suffix: "em",
      },
      top_margin: {
        name: "Top Margin",
        type: "range",
        value: 0,
        min: -100,
        max: 100,
        step: 1,
        suffix: "px",
      },
      bottom_margin: {
        name: "Bottom Margin",
        type: "range",
        value: 0,
        min: -100,
        max: 100,
        step: 1,
        suffix: "px",
      },
    },
    banner_texts: {
      banner_text_1: {
        name: "Banner Text 1",
        type: "input",
        value: "Lorem Ipsum",
      },
      banner_text_2: {
        name: "Banner Text 1",
        type: "input",
        value: "Lorem Ipsum",
      },
      banner_text_3: {
        name: "Banner Text 1",
        type: "input",
        value: "Lorem Ipsum",
      },
      banner_font: {
        name: "Font",
        value: "font-serif",
        type: "font_picker",
      },
      banner_size: {
        name: "Banner Text 1",
        type: "input",
        value: "Lorem Ipsum",
      },
      hide_top_banner_border: {
        name: "Hide Top Banner Border",
        type: "boolean",
        value: false,
      },
      hide_bottom_banner_border: {
        name: "Hide Bottom Banner Border",
        type: "boolean",
        value: false,
      },
    },

    headline: {
      headline: {
        name: "Headline",
        type: "input",
        value: "Lorem Ipsum",
      },
      headline_font: {
        name: "Font",
        value: "font-serif",
        type: "font_picker",
      },
      headline_font_size: {
        ..._fontSizeRange,
      },
      headline_line_height: {
        name: "Line Height",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
      headline_top_margin: {
        name: "Top Margin",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
      headline_bottom_margin: {
        name: "Bottom Margin",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
    },

    quote: {
      quote: {
        name: "Quote / Call Out",
        type: "input",
        value: "Lorem Ipsum",
      },
      quote_font: {
        name: "Font",
        value: "font-serif",
        type: "font_picker",
      },
      quote_font_size: {
        ..._fontSizeRange,
      },
    },

    main_copy: {
      main_copy_content: {
        name: "Main Copy",
        type: "input",
        value: "Lorem Ipsum",
      },
      main_copy_columns: {
        name: "Main Copy Columns",
        type: "range",
        value: 3,
        min: 1,
        max: 4,
        step: 1,
        suffix: "",
      },
      image_filter: {
        name: "Image Effect",
        type: "ink_color_picker",
        value: "none",
      },
      is_main_copy_blurry: {
        name: "Is Main Copy Blurry?",
        type: "boolean",
        value: false,
      },
    },
  },
} as const;

export type NewspaperType = typeof NEWSPAPER;

export const CHARACTER_CARD: iHandoutDefinition = {
  name: "Newspaper",
  data: {
    page_width_percentage: {
      name: "Page Width",
      type: "range",
      value: 80,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-black",
    },
    title: {
      title: {
        name: "Title",
        value: "THE LOREM IPSUM",
        type: "input",
      },
      title_font: {
        name: "Font",
        value: "THE LOREM IPSUM",
        type: "font_picker",
      },
      line_height: {
        name: "Line Height",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
      top_margin: {
        name: "Top Margin",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
      bottom_margin: {
        name: "Bottom Margin",
        type: "range",
        value: 80,
        min: 0,
        max: 100,
        step: 1,
        suffix: "em",
      },
    },
  },
};

export enum eHandoutDefinitions {
  NEWSPAPER = "NEWSPAPER",
  CHARACTER_CARD = "CHARACTER_CARD",
}

export const ALL_HANDOUT_DEFINITIONS = {
  NEWSPAPER,
  CHARACTER_CARD,
};

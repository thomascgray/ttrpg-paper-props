import { nanoid } from "nanoid";
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

type iDataInputImageFilter = {
  name: string;
  type: "image_filter";
  value: string;
};

type iDataInputTextArea = {
  name: string;
  type: "textarea";
  value: string;
  isMarkdown: boolean;
};

type iDataInputTextAlign = {
  name: string;
  type: "text_align";
  value: string;
};
type iDataInputFontWeightPicker = {
  name: string;
  type: "font_weight_picker";
  value: string;
};
type iDataInputSelect = {
  name: string;
  type: "select";
  value: string;
  options: any[];
};
type iDataInputRawImageUrl = {
  name: string;
  type: "raw_image_url";
  value: string;
};
type iDataInputBlendMode = {
  name: string;
  type: "blend_mode";
  value: string;
};
type iDataInputColor = {
  name: string;
  type: "color";
  value: string;
};

export type tHandoutData =
  | iDataInputRange
  | iDataInputPlainText
  | iDataInputInkColorPicker
  | iDataInputFontPicker
  | iDataInputBoolean
  | iDataInputPaperTexture
  | iDataInputImageFilter
  | iDataInputTextArea
  | iDataInputTextAlign
  | iDataInputFontWeightPicker
  | iDataInputSelect
  | iDataInputRawImageUrl
  | iDataInputBlendMode
  | iDataInputColor;

export type iHandoutDefinition = {
  name?: string;
  caption?: string;
  data: {
    [key: string]:
      | tHandoutData
      | tHandoutData[]
      | { [key: string]: tHandoutData }
      | { [key: string]: tHandoutData }[];
  };
};

export const isHandoutData = (obj: any): obj is tHandoutData => {
  return obj.type !== undefined;
};

const _fontSizeRange: iDataInputRange = {
  name: "Font Size",
  type: "range",
  value: 34,
  min: 26,
  max: 200,
  step: 1,
  suffix: "px",
};
const _rotationDegrees: iDataInputRange = {
  name: "Rotation",
  type: "range",
  value: 0,
  min: -60,
  max: 60,
  step: 1,
  suffix: "°",
};
// universal data
const _zoom: iDataInputRange = {
  name: "Zoom",
  type: "range",
  value: 1,
  min: 0.1,
  max: 6,
  step: 0.05,
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
  suffix: "%",
};
const _yOffset: iDataInputRange = {
  name: "Y Offset",
  type: "range",
  value: 0,
  min: -100,
  max: 100,
  step: 1,
  suffix: "%",
};
export const POSITIONING_DATA = {
  rotation_degrees: _rotationDegrees,
  zoom: _zoom,
  x_offset: _xOffset,
  y_offset: _yOffset,
};

export const NEWSPAPER = {
  name: "Newspaper (Front Page)",
  caption:
    "The front page of a newspaper. Configurable title, banners, headline, call-out and copy. Make the copy blurry for a more dramatic effect.",
  data: {
    positioning: {
      ...POSITIONING_DATA,
      y_offset: {
        ..._yOffset,
        value: 0,
      },
    },

    page_width_percentage: {
      name: "Page Width",
      type: "range",
      value: 80,
      min: 0,
      max: 300,
      step: 1,
      suffix: "%",
    },
    paper_texture: _paperTexture,
    paper_tint: {
      name: "Paper Colour Tint",
      type: "color",
      value: "#FFFFFF",
    },

    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-black",
    },
    is_paper_shadow: _isPaperShadow,
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
        value: 50,
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
        value: "Integer a egestas",
      },
      banner_text_2: {
        name: "Banner Text 1",
        type: "input",
        value: "Duis sodales",
      },
      banner_text_3: {
        name: "Banner Text 1",
        type: "input",
        value: "Quisque imperdiet",
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
        value: "ALIQUAM EROS AUGUE, COMMODO EGET RHONCUS NEC!",
      },
      headline_font: {
        name: "Font",
        value: "font-serif",
        type: "font_picker",
      },
      headline_font_size: {
        ..._fontSizeRange,
        value: 34,
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
        value:
          '"Maecenas molestie ac, erat sed ultrices. Ut in vehicula est, ut malesuada eros! Nunc condimentum, aliquet ante nec venenatis"',
      },
      quote_font: {
        name: "Font",
        value: "font-serif",
        type: "font_picker",
      },
      quote_font_size: {
        ..._fontSizeRange,
        value: 20,
      },
    },

    main_copy: {
      main_copy_content: {
        name: "Main Copy",
        type: "textarea",
        value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in posuere mauris. Fusce non metus in ipsum egestas cursus ut id nulla. Praesent sed diam magna. Duis faucibus, tortor eget porttitor interdum, augue lectus posuere quam, in rhoncus nunc dui efficitur erat. Duis sollicitudin sagittis nisl, et faucibus arcu imperdiet vitae. Aliquam efficitur porttitor lacus, malesuada venenatis sapien faucibus eget. Curabitur accumsan, ex quis tempor convallis, risus nunc lobortis diam, in commodo purus nulla ut lorem. Nunc faucibus commodo nunc. Proin sollicitudin turpis eget odio semper placerat at quis tellus. Suspendisse quis risus lacus. Sed gravida mi nibh, et bibendum sem lobortis nec. Mauris ut hendrerit sapien. In sed orci elementum, euismod tellus nec, porttitor velit. Proin accumsan tincidunt ultricies.

Nullam hendrerit in neque a posuere. In et dignissim ex. Ut auctor ipsum quis enim ullamcorper congue. Aenean scelerisque lacus non eros rhoncus, suscipit dignissim ex dapibus. Aenean eleifend lorem velit, in tempor justo auctor at. Nam rutrum imperdiet lectus a consequat. Nunc luctus mauris nec sapien feugiat, eu efficitur augue tincidunt. Nam et luctus ex, ut ultrices dui. Cras bibendum purus erat, id accumsan sapien finibus quis. Vestibulum sapien neque, fermentum vel vulputate in, mollis commodo enim. Mauris purus neque, auctor ut urna eu, interdum laoreet tortor. Fusce ac orci venenatis, volutpat elit quis, tristique metus. Pellentesque porta fermentum libero sed semper. Curabitur tempor orci lacus, in tristique augue volutpat vitae.
`,
        isMarkdown: true,
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
        type: "image_filter",
        value: "none",
      },
      is_main_copy_blurry: {
        name: "Is Main Copy Blurry?",
        type: "boolean",
        value: true,
      },
      text_align: {
        name: "Text Align",
        type: "text_align",
        value: "text-justify",
      },
    },
  },
} as const;
export const CHARACTER_CARD = {
  name: "Character Card",
  caption: "An easy-to-use character card. A picture with 3 lines of text.",
  data: {
    positioning: {
      ...POSITIONING_DATA,
      zoom: {
        ..._zoom,
        value: 1,
      },
    },
    page_width: {
      name: "Page Width",
      type: "range",
      value: 700,
      min: 100,
      max: 1500,
      step: 1,
      suffix: "px",
    },
    paper_texture: {
      ..._paperTexture,
      value: "beige-3",
    },
    is_paper_shadow: _isPaperShadow,
    image_url: {
      name: "Image URL",
      type: "input",
      value:
        "https://i.pinimg.com/564x/49/c1/4d/49c14d528399386e820dd116a25590b2.jpg",
    },
    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-black",
    },
    image_filter: {
      name: "Image Effect",
      type: "image_filter",
      value: "none",
    },
    text_line_one: {
      name: "Line 1",
      type: "input",
      value: "Lorem Ipsum",
    },
    text_line_two: {
      name: "Line 2",
      type: "input",
      value: "Lorem Ipsum",
    },
    text_line_three: {
      name: "Line 3",
      type: "input",
      value: "Lorem Ipsum",
    },
    font: {
      name: "Font",
      type: "font_picker",
      value: "font-serif",
    },
    font_size: {
      name: "Font Size (Relative)",
      type: "range",
      min: 8,
      value: 24,
      max: 100,
      step: 1,
      suffix: "px",
    },
    font_weight: {
      name: "Font Weight",
      type: "font_weight_picker",
      value: "font-normal",
    },
    text_align: {
      name: "Text Align",
      type: "text_align",
      value: "text-left",
    },
  },
} as const;
export const PLAIN_LETTER = {
  name: "Plain Letter",
  caption:
    "A simple plain sheet of paper. Completely configurable via markdown.",
  data: {
    positioning: {
      ...POSITIONING_DATA,
      zoom: {
        ..._zoom,
        value: 1,
      },
    },
    page_width: {
      name: "Page Width",
      type: "range",
      value: 850,
      min: 100,
      max: 1500,
      step: 1,
      suffix: "px",
    },
    is_paper_shadow: _isPaperShadow,
    paper_texture: _paperTexture,
    paper_tint: {
      name: "Paper Colour Tint",
      type: "color",
      value: "#FFFFFF",
    },
    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-black",
    },
    padding: {
      name: "Padding",
      type: "range",
      min: 0,
      max: 100,
      value: 50,
      step: 1,
      suffix: "px",
    },
    paragraph: [
      {
        id: nanoid(),
        main_copy: {
          name: "Main Copy",
          type: "textarea",
          value: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

## Pellentesque nisl ipsum, sodales at velit sit amet, tempor sagittis orci. 

Nullam cursus congue magna, pulvinar commodo massa ornare quis. Etiam eleifend fermentum mauris at aliquet. Aliquam ac augue nunc. 

Mauris mollis bibendum erat, et ultrices tortor pellentesque vitae. 

# Suspendisse sed accumsan augue.

Mauris orci tortor, semper nec purus ac, rhoncus mollis massa. Cras euismod dignissim libero ut luctus. Ut mattis ut tellus quis aliquet. In hac habitasse platea dictumst.          
`,
          isMarkdown: true,
        },
        font: {
          name: "Font",
          type: "font_picker",
          value: "font-serif",
        },
        font_size: {
          name: "Font Size (Relative)",
          type: "range",
          min: 8,
          value: 12,
          max: 100,
          step: 1,
          suffix: "px",
        },
        font_weight: {
          name: "Font Weight",
          type: "font_weight_picker",
          value: "font-normal",
        },
        text_align: {
          name: "Text Align",
          type: "text_align",
          value: "text-left",
        },
      },
    ],
    paragraph_gap: {
      name: "Paragraph Gap",
      type: "range",
      min: 0,
      value: 0,
      max: 100,
      step: 1,
      suffix: "px",
    },
  },
} as const;
export const BOOK_COVER = {
  name: "Book Cover",
  caption: "A book cover, with markdown-configurable cover text",
  data: {
    book_cover_template: {
      name: "Book Cover Template",
      type: "select",
      value: "/images/book-cover-1.avif",
      options: [
        { label: "Book Cover 1", value: "/images/book-cover-1.avif" },
        { label: "Book Cover 2", value: "/images/book-cover-2.avif" },
        { label: "Book Cover 3", value: "/images/book-cover-3.png" },
        { label: "Book Cover 4", value: "/images/book-cover-4.png" },
      ],
    },
    positioning: {
      ...POSITIONING_DATA,
      zoom: {
        ..._zoom,
        value: 1,
      },
    },
    ink_color: {
      name: "Ink Colour",
      type: "ink_color_picker",
      value: "ink-white",
    },
    font: {
      name: "Font",
      type: "font_picker",
      value: "font-serif",
    },
    font_size: {
      name: "Font Size (Relative)",
      type: "range",
      min: 8,
      value: 30,
      max: 100,
      step: 1,
      suffix: "px",
    },
    font_weight: {
      name: "Font Weight",
      type: "font_weight_picker",
      value: "font-normal",
    },
    text_left_margin: {
      name: "Text Left Margin",
      type: "range",
      value: 13,
      min: -100,
      max: 100,
      step: 1,
      suffix: "px",
    },
    text_align: {
      name: "Text Align",
      type: "text_align",
      value: "text-center",
    },
    text_effect: {
      name: "Text Effect",
      type: "blend_mode",
      value: "blend-mode-normal",
    },
    main_copy: {
      name: "Main Copy",
      type: "textarea",
      isMarkdown: true,
      value: `# MYSTICAL ARTIFACTS

## A STUDY IN THE STRANGE AND WEIRD

### A. COBALT ET.AL`,
    },
  },
} as const;

export enum eHandoutDefinitions {
  NEWSPAPER = "NEWSPAPER",
  CHARACTER_CARD = "CHARACTER_CARD",
  PLAIN_LETTER = "PLAIN_LETTER",
  BOOK_COVER = "BOOK_COVER",
}

export const ALL_HANDOUT_DEFINITIONS = {
  NEWSPAPER,
  CHARACTER_CARD,
  PLAIN_LETTER,
  BOOK_COVER,
};

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

export type Edge = "top" | "right" | "bottom" | "left";

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

const fontSizeRange = (
  name: string = "Font Size",
  value: number = 34,
  min: number = 26,
  max: number = 200,
  step: number = 1
): iDataInputRange => ({
  name,
  type: "range",
  value,
  min,
  max,
  step: 1,
  suffix: "px",
});

const fontPicker = (name: string = "Font"): iDataInputFontPicker => ({
  name,
  type: "font_picker",
  value: "font-serif",
});

const _rotationDegrees: iDataInputRange = {
  name: "Rotation",
  type: "range",
  value: 0,
  min: -60,
  max: 60,
  step: 1,
  suffix: "°",
};
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
const textAreaWithMarkdown = (
  name: string = "Text Area",
  value?: string
): iDataInputTextArea => {
  return {
    name,
    type: "textarea",
    value:
      value ??
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vehicula lorem, a mattis quam lobortis finibus. Etiam egestas suscipit egestas. Morbi accumsan iaculis urna, nec vehicula ex feugiat eu. Aliquam vel consectetur elit. Donec erat leo, sagittis vitae porttitor nec, consectetur non sem. Donec dictum iaculis eros sit amet lacinia. Morbi pulvinar quis augue ut fringilla. Pellentesque accumsan, metus eu ultricies tristique, velit lorem molestie lacus, a malesuada nulla lectus porta mauris.

Vestibulum tempor venenatis enim et rutrum. Etiam ut magna a massa convallis luctus. In justo enim, feugiat non mi sed, viverra mollis nulla. Praesent lobortis suscipit leo at lacinia. Phasellus metus tellus, fringilla vel dictum vel, congue in est. In non commodo ante. Vivamus nec placerat libero, at interdum mi. Aliquam odio purus, fringilla eu scelerisque a, dignissim sed mi. Mauris sollicitudin et massa laoreet consequat. Duis et volutpat orci, non hendrerit turpis. Sed ut mi ac purus volutpat egestas sed ut enim.

Vivamus id arcu interdum ante eleifend maximus nec interdum metus. Nam ultrices nisl vel justo scelerisque, non ultricies diam tristique. Proin mattis at nibh in ornare. Phasellus suscipit tincidunt ante sit amet posuere. Aenean porta, arcu eu cursus aliquet, urna turpis rhoncus tellus, in pharetra erat lectus sit amet enim. Mauris ut ultricies tellus, vitae auctor magna. Cras dapibus bibendum ante, sit amet efficitur mi. Morbi sapien augue, hendrerit a condimentum sed, eleifend vel mi. Aenean molestie turpis eget mollis accumsan. Donec ut magna vel tortor porttitor feugiat. Donec consequat eros in tellus sollicitudin ullamcorper. Donec cursus, massa in aliquet congue, metus urna porttitor orci, vel ultrices libero lacus a nisi. Donec sit amet nunc mattis, lobortis lacus sit amet, auctor risus.`,

    isMarkdown: true,
  };
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
      value: 60,
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
      title_font_size: fontSizeRange("Font Size", 50),
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
      banner_font: fontPicker(),
      banner_size: fontSizeRange("Banner Text Size", 16),
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
      headline_font_size: fontSizeRange("Font Size", 34),
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
      quote_font_size: fontSizeRange("Font Size", 20),
    },

    main_copy: {
      main_copy_content: textAreaWithMarkdown("Main Copy"),
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
export const NEWSPAPER_CLIPPING = {
  name: "Newspaper Clipping (Vertical)",
  caption:
    "A simplified version of a newspaper 'clipping' - a classic vertical slice.",
  data: {
    positioning: {
      ...POSITIONING_DATA,
      y_offset: {
        ..._yOffset,
        value: 0,
      },
    },
    dimensions: {
      page_width: {
        name: "Page Width",
        type: "range",
        value: 400,
        min: 100,
        max: 1800,
        step: 1,
        suffix: "px",
      },
      page_height: {
        name: "Page Height",
        type: "range",
        value: 700,
        min: 100,
        max: 1200,
        step: 1,
        suffix: "px",
      },
    },
    paper: {
      paper_texture: _paperTexture,
      paper_tint: {
        name: "Paper Colour Tint",
        type: "color",
        value: "#FFFFFF",
      },
      is_paper_shadow: _isPaperShadow,
    },
    prefix_copy: textAreaWithMarkdown(
      "Prefix Copy",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius vestibulum porttitor. Donec egestas egestas commodo. Nullam tincidunt, felis ut rutrum rhoncus, nunc metus mattis arcu, sit amet vulputate velit nunc in metus. Nullam lacinia mauris id mauris semper malesuada."
    ),
    is_prefix_blurry: {
      name: "Is Prefix Blurry?",
      type: "boolean",
      value: true,
    },
    main_copy: textAreaWithMarkdown(
      "Main Copy",
      "Curabitur eu tellus et nibh ornare ornare non nec nibh. Etiam sapien enim, suscipit et fermentum id, aliquet iaculis ipsum. Mauris pharetra congue"
    ),
    suffix_copy: textAreaWithMarkdown(
      "Suffix Copy",
      "Phasellus aliquam arcu sed risus imperdiet, non tempus nisl egestas."
    ),
    is_suffix_blurry: {
      name: "Is Suffix Blurry?",
      type: "boolean",
      value: true,
    },

    font: fontPicker(),
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
    font_size: fontSizeRange("Font Size (Relative)", 24),
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
          value: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 

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
        font_size: fontSizeRange("Font Size (Relative)", 12),
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
    font_size: fontSizeRange("Font Size (Relative)", 30),
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

export const DOSSIER = {
  name: "Dossier",
  caption: "Table'd data",
  data: {
    positioning: {
      ...POSITIONING_DATA,
      zoom: {
        ..._zoom,
        value: 1,
      },
    },
    paper_texture: _paperTexture,

    //     ink_color: {
    //       name: "Ink Colour",
    //       type: "ink_color_picker",
    //       value: "ink-white",
    //     },
    //     font: {
    //       name: "Font",
    //       type: "font_picker",
    //       value: "font-serif",
    //     },
    //     font_size: fontSizeRange("Font Size (Relative)", 30),
    //     font_weight: {
    //       name: "Font Weight",
    //       type: "font_weight_picker",
    //       value: "font-normal",
    //     },
    //     text_left_margin: {
    //       name: "Text Left Margin",
    //       type: "range",
    //       value: 13,
    //       min: -100,
    //       max: 100,
    //       step: 1,
    //       suffix: "px",
    //     },
    //     text_align: {
    //       name: "Text Align",
    //       type: "text_align",
    //       value: "text-center",
    //     },
    //     text_effect: {
    //       name: "Text Effect",
    //       type: "blend_mode",
    //       value: "blend-mode-normal",
    //     },
    //     main_copy: {
    //       name: "Main Copy",
    //       type: "textarea",
    //       isMarkdown: true,
    //       value: `# MYSTICAL ARTIFACTS

    // ## A STUDY IN THE STRANGE AND WEIRD

    // ### A. COBALT ET.AL`,
    //     },
  },
} as const;

export const LABELLED_LIQUID = {
  name: "Labelled Liquid",
  caption: "A bottle, vial, or other labelled liquid",
  data: {
    image_template: {
      name: "Image Template",
      type: "select",
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
    },
    image_hue_filter: {
      name: "Image Hue Filter (Rotate)",
      type: "range",
      value: 0,
      min: 0,
      max: 90,
      step: 1,
      suffix: "°",
    },
    image_width: {
      name: "Image Width",
      type: "range",
      value: 400,
      min: 100,
      max: 1000,
      step: 2,
      suffix: "px",
    },
    image_rotation: {
      name: "Image Rotation",
      type: "range",
      value: 0,
      min: -90,
      max: 90,
      step: 1,
      suffix: "°",
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
    font_size: fontSizeRange("Font Size (Relative)", 12, 1, 100, 0.1),
    font_weight: {
      name: "Font Weight",
      type: "font_weight_picker",
      value: "font-normal",
    },
    text_top_margin: {
      name: "Text Top Margin",
      type: "range",
      value: 90,
      min: -100,
      max: 250,
      step: 1,
      suffix: "%",
    },
    text_left_margin: {
      name: "Text Left Margin",
      type: "range",
      value: 65,
      min: -100,
      max: 100,
      step: 1,
      suffix: "px",
    },
    text_width: {
      name: "Text Width",
      type: "range",
      value: 56,
      min: -100,
      max: 150,
      step: 1,
      suffix: "%",
    },
    text_rotation: {
      name: "Text Rotation",
      type: "range",
      value: 0,
      min: -90,
      max: 90,
      step: 1,
      suffix: "°",
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
      value: `# LOVE POTION No. 9
      
### _Elixer Sue_`,
    },
  },
} as const;

export enum eHandoutDefinitions {
  NEWSPAPER = "NEWSPAPER",
  NEWSPAPER_CLIPPING = "NEWSPAPER_CLIPPING",
  CHARACTER_CARD = "CHARACTER_CARD",
  PLAIN_LETTER = "PLAIN_LETTER",
  BOOK_COVER = "BOOK_COVER",
  LABELLED_LIQUID = "LABELLED_LIQUID",
  DOSSIER = "DOSSIER",
}

export const ALL_HANDOUT_DEFINITIONS = {
  NEWSPAPER,
  NEWSPAPER_CLIPPING,
  CHARACTER_CARD,
  PLAIN_LETTER,
  DOSSIER,
  BOOK_COVER,
  LABELLED_LIQUID,
};

export const DIGITAL_PAPER_DEFINITIONS = {
  NEWSPAPER,
  NEWSPAPER_CLIPPING,
  CHARACTER_CARD,
  PLAIN_LETTER,
  DOSSIER,
};

export const OBJECT_DEFINITIONS = {
  BOOK_COVER,
  LABELLED_LIQUID,
};

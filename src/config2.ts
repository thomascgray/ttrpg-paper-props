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
  | iDataInputFontWeightPicker;

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
  value: 0.6,
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
  data: {
    positioning: {
      ...POSITIONING_DATA,
      y_offset: {
        ..._yOffset,
        value: -10,
      },
    },

    page_width_percentage: {
      name: "Page Width",
      type: "range",
      value: 80,
      min: 0,
      max: 100,
      step: 1,
      suffix: "%",
    },
    paper_texture: _paperTexture,
    is_paper_shadow: _isPaperShadow,
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
        value: 80,
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
      },
    },

    main_copy: {
      main_copy_content: {
        name: "Main Copy",
        type: "textarea",
        value: `Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. ![alt text](https://static.standard.co.uk/s3fs-public/thumbnails/image/2016/05/18/17/black_chronicles_exhibition_at_the_national_portrait_gallery.00_01_37_07.still001.jpg?width=1200) Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo.\n\n### Nam non gravida lectus.\n\n Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus  vitae tortor euismod elementum. Curabitur placerat sed lorem id gravida. Maecenas egestas eget dui id mollis. Fusce varius eleifend nunc et efficitur. Sed vel dui quis risus tempus euismod. Etiam ultrices, velit ac aliquet interdum, felis augue scelerisque magna, eget placerat nunc ante s. \n\n# Aenean faucibus at!\n\nProin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. ![alt text](http://images.summitmedia-digital.com/esquiremagph/images/2020/07/09/bearded-batman-1800s-MAIN.jpg) Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Sed euismod metus sed mauris accumsan. \n\n### Aenean faucibus placerat felis Nnec vulputate velit faucibus at.\n\n Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. ![alt text](https://static.stacker.com/s3fs-public/00007074_0.png) Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed nec nisl eu massa accumsan facilisis ut a lacus. Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. ![alt text](https://media.npr.org/assets/img/2015/09/15/oldsmobile-loc_custom-d4496485e41ba2476a7392c5252f3d0a5cdce3f9.jpg) Nam velit lorem, porta convallis dignissim ac, porta non quam. Quisque tincidunt nulla eu mi ornare, in vestibulum magna consequat. Sed euismod metus sed mauris accumsan, in pretium arcu euismod. Aenean at tristique nunc, nec ornare nibh. Nulla commodo suscipit tortor. Morbi eu urna feugiat, bibendum libero commodo, pharetra nulla. Suspendisse nec mauris aliquam, suscipit eros eget, imperdiet sapien. Sed bibendum molestie faucibus. Aenean faucibus placerat felis, nec vulputate velit faucibus at. Proin eget malesuada eros, et posuere leo. Nam non gravida lectus. Maecenas commodo, ex sed rhoncus dignissim, mauris purus mollis diam, nec tempus ex ligula sed diam. Duis tristique metus arcu, ac porttitor risus maximus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.`,
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
    paper_texture: _paperTexture,
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
    image_border: {
      name: "Image Border",
      type: "input",
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
} as const;

export enum eHandoutDefinitions {
  NEWSPAPER = "NEWSPAPER",
  CHARACTER_CARD = "CHARACTER_CARD",
}

export const ALL_HANDOUT_DEFINITIONS = {
  NEWSPAPER,
  CHARACTER_CARD,
};

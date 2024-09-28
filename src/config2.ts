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
type iDataInputTextFilter = {
  name: string;
  type: "text_filter";
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
  | iDataInputTextFilter;

export type iHandoutDefinition = {
  name?: string;
  caption?: string;
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
      value: 20,
      step: 1,
      suffix: "px",
    },
    main_copy: {
      name: "Main Copy",
      type: "textarea",
      value: `# Lorem ipsum dolor sit amet

consectetur adipiscing elit. Duis leo purus, porta eget imperdiet id, commodo quis ligula. Vivamus convallis tortor vel odio suscipit, vel faucibus erat bibendum. 

![](https://i.imgur.com/WZLUP8D.jpeg)

### Duis at magna porta, vestibulum lorem et

lacinia ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer convallis id magna et porta. Curabitur at arcu in nibh volutpat consectetur. Phasellus sit amet porta tellus, id sagittis est. Donec et est id felis ullamcorper dictum quis vel mi. Aenean eget lacinia quam, eget placerat neque. Pellentesque 

sed tincidunt leo, a suscipit enim. Morbi id mi ac felis molestie vulputate ut sit amet tortor. Curabitur non hendrerit dolor. Ut quis rutrum est, nec pulvinar neque. Fusce at posuere libero.

# Cras fermentum consequat 

faucibus. Phasellus hendrerit risus ut feugiat consectetur. Maecenas urna leo, congue sed sagittis ut, pulvinar vel erat. Pellentesque risus lectus, fringilla vel commodo ut, feugiat a est. Cras quam elit, placerat vel ante non, gravida sollicitudin libero. Suspendisse imperdiet porttitor ante nec finibus. Nullam non tempor sapien. Etiam vulputate at felis ut congue. Donec quis porttitor neque, at hendrerit mi. Etiam egestas leo hendrerit leo ullamcorper, id vehicula mauris tincidunt. 

Nunc pretium non enim sed accumsan. Nullam et velit a sapien feugiat efficitur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam ultricies risus auctor, mollis arcu vitae, aliquet augue.

Sed et erat at lorem pharetra dignissim. Vivamus in diam feugiat, feugiat urna ac, scelerisque nulla. Mauris lobortis ligula libero, et pretium erat pretium vel. Integer fermentum laoreet convallis. Fusce et libero vel mauris aliquet molestie. Integer non velit a felis mattis faucibus. Nunc eu viverra eros. Fusce sed rutrum lorem. Donec ac semper massa, ac aliquet lacus. Maecenas scelerisque ligula eget turpis fermentum ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat volutpat risus, fermentum sollicitudin risus posuere sed. Morbi iaculis 

## dapibus quam, quis egestas urna sodales sit amet.`,
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
} as const;

export const BOOK_COVER = {
  name: "Book Cover",
  caption: "A book cover",
  data: {
    book_cover_template: {
      name: "Book Cover Template",
      type: "raw_image_url",
      value: "/images/ragged-journal-cover.png",
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
    text_effect: {
      name: "Text Effect",
      type: "text_filter",
      value: "text-filter-none",
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

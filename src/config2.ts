export const UNIVERSAL_DATA = {
  rotation_degrees: 0,
  zoom: 1,
  paper_texture: "grey",
  is_paper_shadow: true,
  x_offset: 0,
  y_offset: 0,
};

interface iDataInputRange {
  name: string;
  type: "range";
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
}

interface iDataInputPlainText {
  name: string;
  type: "input";
  value: string;
  placeholder?: string;
}

interface iDataInputInkColorPicker {
  name: string;
  type: "ink_color_picker";
  value: string;
}

interface iDataInputFontPicker {
  name: string;
  type: "font_picker";
  value: string;
}

export type tHandoutData =
  | iDataInputRange
  | iDataInputPlainText
  | iDataInputInkColorPicker
  | iDataInputFontPicker;

// make an interface that matches the NEWSPAPER below
// its an object with a name and a data
// and inside the data, each key is EITHER
// an input type, like a input or a range or an ink color picker
// OR its a nested object that has those input types

export interface iHandoutDefinition {
  name?: string;
  data: {
    [key: string]:
      | tHandoutData
      | {
          [key: string]: tHandoutData;
        };
  };
}

export const isHandoutData = (obj: any): obj is tHandoutData => {
  return (
    obj.type === "range" ||
    obj.type === "input" ||
    obj.type === "ink_color_picker" ||
    obj.type === "font_picker"
  );
};

// function isFish(pet: Fish | Bird): pet is Fish {
//     return (pet as Fish).swim !== undefined;
//   }

export const NEWSPAPER: iHandoutDefinition = {
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

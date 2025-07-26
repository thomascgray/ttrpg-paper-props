import { FontFamily, CrtScreenTextColor } from "./enums";
import { HandoutConfig } from "./types";

export const range = (overrides?: {
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

export const paperTexture = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Paper Texture",
    type: "paper_texture" as const,
    value: "grey",
    ...overrides,
  };
};

export const boolean = (overrides?: { name?: string; value?: boolean }) => {
  return {
    name: "Boolean",
    type: "boolean" as const,
    value: true,
    ...overrides,
  };
};

export const colour = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Colour",
    type: "color" as const,
    value: "#FFFFFF",
    ...overrides,
  };
};

export const text = (overrides?: {
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

export const textArea = (overrides?: {
  name?: string;
  value?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
}) => {
  return {
    name: "Textarea",
    type: "textarea" as const,
    value: "Lorem ipsum",
    minRows: 4,
    autoResize: true,
    ...overrides,
  };
};

export const fontPicker = (overrides?: {
  name?: string;
  value?: FontFamily;
}) => {
  return {
    name: "Font Picker",
    type: "font_picker" as const,
    value: FontFamily.SERIF,
    ...overrides,
  };
};

export const inkSelector = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Ink Color",
    type: "ink_color" as const,
    value: "ink-black",
    ...overrides,
  };
};

export const imageFilter = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Image Filter",
    type: "image_filter" as const,
    value: "none",
    ...overrides,
  };
};

export const textAlign = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Text Align",
    type: "text_align" as const,
    value: "text-justify",
    ...overrides,
  };
};

export const imageInput = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Image Input",
    type: "image_input" as const,
    value: "",
    ...overrides,
  };
};

export const fontWeightPicker = (overrides?: {
  name?: string;
  value?: string;
}) => {
  return {
    name: "Font Weight",
    type: "font_weight_picker" as const,
    value: "font-normal",
    ...overrides,
  };
};

export const paragraphArray = (overrides?: { name?: string }) => {
  return {
    name: "Paragraph Array",
    type: "paragraph_array" as const,
    ...overrides,
  };
};

export const select = (overrides?: {
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

export const blendMode = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Blend Mode",
    type: "blend_mode" as const,
    value: "blend-mode-normal",
    ...overrides,
  };
};

export const crtPixelColours = (overrides?: {
  name?: string;
  value?: string;
}) => {
  return {
    name: "CRT Pixel Colour",
    type: "crt_pixel_colours" as const,
    value: CrtScreenTextColor["1"],
    ...overrides,
  };
};

export const legendItems = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Legend Items",
    type: "legend_items" as const,
    value: [],
    ...overrides,
  };
};

export const fontSize = () =>
  range({ name: "Font Size", min: 16, max: 200, suffix: "px" });
export const lineHeight = () =>
  range({ name: "Line Height", min: 0, max: 4, step: 0.1, suffix: "em" });
export const rotation = () =>
  range({ name: "Rotation", min: -60, max: 60, suffix: "°" });
export const zoom = () =>
  range({ name: "Zoom", min: -0.1, max: 6, step: 0.05 });

export const imageOpts = {
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

export const imageOptsWithoutScaling = {
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

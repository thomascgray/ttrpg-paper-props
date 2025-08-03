import { FontFamily, CrtScreenTextColor, FontWeight } from "./enums";
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

export const textStyle = (overrides?: { name?: string; value?: string }) => {
  return {
    name: "Text Style",
    type: "text_style" as const,
    value: "",
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

export const imagePostProcessing = {
  imagePostProcessing: {
    blur: [
      0,
      range({ name: "Blur", min: 0, max: 20, suffix: "px", step: 0.5 }),
    ],
    brightness: [
      100,
      range({ name: "Brightness", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    contrast: [
      100,
      range({ name: "Contrast", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    grayscale: [
      0,
      range({ name: "Grayscale", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    hue_rotation: [
      0,
      range({ name: "Hue Rotation", min: 0, max: 360, suffix: "°", step: 2 }),
    ],
    invert: [
      0,
      range({ name: "Invert", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    opacity: [
      100,
      range({ name: "Opacity", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    saturation: [
      100,
      range({ name: "Saturation", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    sepia: [
      0,
      range({ name: "Sepia", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
  },
} satisfies HandoutConfig;

export const imageOpts = {
  image: {
    blur: [
      0,
      range({ name: "Blur", min: 0, max: 20, suffix: "px", step: 0.5 }),
    ],
    brightness: [
      100,
      range({ name: "Brightness", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    contrast: [
      100,
      range({ name: "Contrast", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    grayscale: [
      0,
      range({ name: "Grayscale", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    hue_rotation: [
      0,
      range({ name: "Hue Rotation", min: 0, max: 360, suffix: "°", step: 2 }),
    ],
    invert: [
      0,
      range({ name: "Invert", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    opacity: [
      100,
      range({ name: "Opacity", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    saturation: [
      100,
      range({ name: "Saturation", min: 0, max: 200, suffix: "%", step: 5 }),
    ],
    sepia: [
      0,
      range({ name: "Sepia", min: 0, max: 100, suffix: "%", step: 5 }),
    ],
    scaleX: [1, range({ name: "Scale X", min: 0.1, max: 10, step: 0.1 })],
    scaleY: [1, range({ name: "Scale Y", min: 0.1, max: 10, step: 0.1 })],
  },
} satisfies HandoutConfig;

export const positioning = {
  positioning: {
    rotation: [
      0,
      range({ name: "Rotation", min: -180, max: 180, suffix: "°" }),
    ],
    zoom: [1, range({ name: "Zoom", min: -0.1, max: 6, step: 0.05 })],
    xOffset: [0, range({ name: "X Offset", min: -200, max: 200, suffix: "%" })],
    yOffset: [0, range({ name: "Y Offset", min: -200, max: 200, suffix: "%" })],
  },
} satisfies HandoutConfig;

export const textFull = (overrides?: {
  text?: { default?: string; name?: string; placeholder?: string };
  font?: { default?: FontFamily; name?: string };
  fontSize?: { default?: number; name?: string; min?: number; max?: number };
  fontWeight?: { default?: FontWeight; name?: string };
  textAlign?: { default?: string; name?: string };
  textStyle?: { default?: string; name?: string };
}) => {
  return {
    text: [
      overrides?.text?.default || "placeholder",
      text({
        name: overrides?.text?.name || "Text",
        placeholder: overrides?.text?.placeholder,
      }),
    ],
    font: [
      overrides?.font?.default || FontFamily.SERIF,
      fontPicker({
        name: overrides?.font?.name || "Font",
      }),
    ],
    fontSize: [
      overrides?.fontSize?.default || 24,
      range({
        name: overrides?.fontSize?.name || "Font Size",
        min: overrides?.fontSize?.min || 16,
        max: overrides?.fontSize?.max || 100,
        suffix: "px",
      }),
    ],
    textAlign: [
      overrides?.textAlign?.default || "text-left",
      textAlign({
        name: overrides?.textAlign?.name || "Text Align",
      }),
    ],
    textStyle: [
      overrides?.textStyle?.default || "",
      textStyle({
        name: overrides?.textStyle?.name || "Text Style",
      }),
    ],
  } satisfies HandoutConfig;
};

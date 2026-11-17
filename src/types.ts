import type {
  range,
  paperTexture,
  boolean,
  colour,
  text,
  textArea,
  fontPicker,
  textAlign,
  imageFilter,
  imageInput,
  inkSelector,
  fontWeightPicker,
  paragraphArray,
  select,
  radio,
  imageRadio,
  blendMode,
  crtPixelColours,
  legendItems,
  booksArray,
  textStyle,
  x_y_position,
  action,
} from "./inputHelpers";

export type ConfigTuple = [
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
    | ReturnType<typeof fontWeightPicker>
    | ReturnType<typeof paragraphArray>
    | ReturnType<typeof select>
    | ReturnType<typeof radio>
    | ReturnType<typeof imageRadio>
    | ReturnType<typeof blendMode>
    | ReturnType<typeof crtPixelColours>
    | ReturnType<typeof legendItems>
    | ReturnType<typeof booksArray>
    | ReturnType<typeof textStyle>
    | ReturnType<typeof x_y_position>
    | ReturnType<typeof action>
  )
];

export type HandoutConfig = {
  [key: string]: ConfigTuple | HandoutConfig;
};

export type ExtractConfigValues<T> = T extends readonly [infer Value, any]
  ? Value
  : T extends object
  ? { [K in keyof T]: ExtractConfigValues<T[K]> }
  : never;

export type HandoutTable = {
  id: string;
  type: string;
  data: any;
};

export type VersionTable = {
  id: string;
  handoutType: string;
  data: any;
  timestamp: number;
  createdAt: Date;
};

export type AppConfigTable = {
  id: string;
  appVersion: number;
  selectedHandoutType: string;
  selectedVersionId: string | undefined;
  updatedAt: Date;
};

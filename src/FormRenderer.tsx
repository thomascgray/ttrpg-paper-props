import React from "react";
import { RangeInput } from "./components/RangeInput";
import { ColourPicker } from "./components/ColourPicker";
import { InkColorSelector } from "./components/InkColorSelector";
import { CrtPixelColourSelector } from "./components/CrtPixelColourSelector";
import { CheckboxInput } from "./components/CheckboxInput";
import { TextInput } from "./components/TextInput";
import { TextArea } from "./components/TextArea";
import { FontSelector } from "./components/FontSelector";
import { PaperTextureSelect } from "./components/PaperTextureSelect";
import { ImageFilterSelector } from "./components/ImageFilterSelector";
import { TextAlignmentSelector } from "./components/TextAlignmentSelector";
import { FontWeightSelector } from "./components/FontWeightSelector";
import { Select } from "./components/Select";
import { ImageInput } from "./components/ImageInput";
import { ParagraphArray } from "./components/ParagraphArray";
import { BlendModeSelector } from "./components/TextFilterSelector";
import { LegendItems } from "./components/LegendItems";
import { TextStyleSelector } from "./components/TextStyleSelector";
import XYPicker from "./components/XYPicker";

interface FormRendererProps {
  formConfig: Record<string, any>;
  data: Record<string, any>;
  onChange: (path: string, value: any) => void;
}

const getValueAtPath = (data: Record<string, any>, path: string): any => {
  const keys = path.split(".");
  let current = data;

  for (const key of keys) {
    if (current?.[key] !== undefined) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
};

const renderFormInput = (
  config: { inputConfig: any; path: string },
  value: any,
  onChange: (path: string, value: any) => void
) => {
  const { inputConfig, path } = config;
  const { type, name, ...restConfig } = inputConfig;

  const handleUpdate = (newValue: any) => {
    onChange(path, newValue);
  };

  switch (type) {
    case "range":
      return (
        <RangeInput
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
          min={restConfig.min}
          max={restConfig.max}
          step={restConfig.step}
          suffix={restConfig.suffix}
        />
      );

    case "color":
      return (
        <ColourPicker
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "ink_color":
      return (
        <InkColorSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "boolean":
      return (
        <CheckboxInput
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "text":
      return (
        <TextInput
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "textarea":
      return (
        <TextArea
          key={path}
          label={name}
          value={value ?? restConfig.value}
          rows={restConfig.rows ?? 4}
          minRows={restConfig.minRows}
          autoResize={restConfig.autoResize}
          onUpdate={handleUpdate}
        />
      );

    case "font_picker":
      return (
        <FontSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "paper_texture":
      return (
        <PaperTextureSelect
          key={path}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "image_filter":
      return (
        <ImageFilterSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "text_align":
      return (
        <TextAlignmentSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "font_weight":
      return (
        <FontWeightSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "select":
      return (
        <Select
          key={path}
          label={name}
          value={value ?? restConfig.value}
          options={restConfig.options ?? []}
          onUpdate={handleUpdate}
        />
      );

    case "image_input":
      return (
        <ImageInput
          key={path}
          label={name}
          value={value}
          onUpdate={handleUpdate}
        />
      );
    case "font_weight_picker":
      return (
        <FontWeightSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "paragraph_array":
      return (
        <ParagraphArray
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "crt_pixel_colours":
      return (
        <CrtPixelColourSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );
    case "blend_mode":
      return (
        <BlendModeSelector
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );
    case "legend_items":
      return (
        <LegendItems
          key={path}
          label={name}
          value={value ?? restConfig.value}
          onUpdate={handleUpdate}
        />
      );

    case "text_style":
      return (
        <TextStyleSelector
          key={path}
          label={name}
          value={value ?? restConfig.value ?? ""}
          onUpdate={handleUpdate}
        />
      );

    case "x_y_position":
      return (
        <XYPicker
          key={path}
          // label={name}
          initialValue={value ?? restConfig.value}
          onChange={handleUpdate}
        />
      );

    default:
      console.warn(`Unknown input type: ${type}`);
      return null;
  }
};

const renderFormSection = (
  key: string,
  config: any,
  data: Record<string, any>,
  onChange: (path: string, value: any) => void
): React.ReactNode => {
  // If it has inputConfig and path, it's a form input
  if (config.inputConfig && config.path) {
    const value = getValueAtPath(data, config.path);
    return renderFormInput(config, value, onChange);
  }

  // Otherwise, it's a container with nested items
  if (typeof config === "object" && config !== null) {
    return (
      <details key={key} className="transition-all bg-gray-400 p-2 mb-4 ">
        <summary className="cursor-pointer">
          <h3 className="font-semibold text-lg capitalize inline-block ">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </h3>
        </summary>
        <div className="space-y-6 mt-4">
          {Object.entries(config).map(([nestedKey, nestedConfig]) =>
            renderFormSection(nestedKey, nestedConfig, data, onChange)
          )}
        </div>
      </details>
    );
  }

  return null;
};

export const FormRenderer: React.FC<FormRendererProps> = ({
  formConfig,
  data,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      {Object.entries(formConfig)
        .filter(([key]) => key !== "positioning") // Skip positioning - handled by floating controls
        .map(([key, config]) =>
          renderFormSection(key, config, data, onChange)
        )}
    </div>
  );
};

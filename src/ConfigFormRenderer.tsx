import React from "react";
import {
  eHandoutDefinitions,
  iHandoutDefinition,
  isHandoutData,
  tHandoutData,
} from "./config2";
import { RangeInput } from "./components/RangeInput";
import { StateContext } from "./context";
import * as _ from "lodash";
import { InkColorSelector } from "./components/InkColorSelector";
import { FontSelector } from "./components/FontSelector";
import { CheckboxInput } from "./components/CheckboxInput";
import { PaperTextureSelect } from "./components/PaperTextureSelect";
import { ImageFilterSelector } from "./components/ImageFilterSelector";
import { TextArea } from "./components/TextArea";
import { TextAlignmentSelector } from "./components/TextAlignmentSelector";
import { FontWeightSelector } from "./components/FontWeightSelector";
import { Select } from "./components/Select";

interface iConfigFormRendererProps {
  handoutDefinitionKey: eHandoutDefinitions;
  dataset: iHandoutDefinition["data"];
  config: iHandoutDefinition;
}

const renderHandoutData = (
  handoutDefinitionKey: eHandoutDefinitions,
  compoundKey: string,
  config: tHandoutData,
  dataset: any,
  onChange: (key: string, value: any) => void,
  valueAccessKey: string
) => {
  const val = _.get(dataset, valueAccessKey);
  const finalKey = `${compoundKey}`;

  switch (config.type) {
    case "range":
      return (
        <RangeInput
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
          suffix={config.suffix}
          min={config.min}
          max={config.max}
          step={config.step}
        />
      );
    case "input":
      return (
        <label className="block">
          <span className="block mb-1">{config.name}</span>
          <div className="flex">
            <input
              value={val}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                onChange(finalKey, e.target.value);
              }}
            />
          </div>
        </label>
      );
    case "ink_color_picker":
      return (
        <InkColorSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );
    case "font_picker":
      return (
        <FontSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );
    case "boolean":
      return (
        <CheckboxInput
          label={config.name}
          value={val}
          onUpdate={(newValue) => onChange(finalKey, newValue)}
        />
      );
    case "paper_texture":
      return (
        <PaperTextureSelect
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );
    case "image_filter":
      return (
        <ImageFilterSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );

    case "textarea":
      return (
        <TextArea
          label={config.name}
          rows={10}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );

    case "text_align":
      return (
        <TextAlignmentSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );

    case "font_weight_picker":
      return (
        <FontWeightSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );
    case "select":
      return (
        <Select
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
          options={config.options}
        />
      );

    default:
      return <div>unknown type</div>;
  }
};

export const ConfigFormRenderer = (props: iConfigFormRendererProps) => {
  const { config } = props;

  const { name, data } = config;

  const stateContext = React.useContext(StateContext);

  return (
    <div className="space-y-4">
      {Object.keys(data).map((key) => {
        if (isHandoutData(data[key])) {
          return (
            <div
              key={key}
              onMouseEnter={() => stateContext.setHighlighted(key)}
              onMouseLeave={() => stateContext.setHighlighted("")}
            >
              {renderHandoutData(
                props.handoutDefinitionKey,
                key,
                data[key] as tHandoutData,
                _.get(props.dataset, key),
                stateContext.onChange,
                "value"
              )}
            </div>
          );
        } else {
          return (
            <details
              onMouseEnter={() => stateContext.setHighlighted(key)}
              onMouseLeave={() => stateContext.setHighlighted("")}
              key={key}
              className="bg-gray-400 space-y-4 p-2"
            >
              <summary className="cursor-pointer font-bold">
                {_.startCase(_.toLower(key))}
              </summary>
              <div className="flex flex-col space-y-4">
                {Object.keys(data[key]).map((nestedKey) => {
                  const nestedHandoutData = (data[key] as any)[nestedKey];
                  return (
                    <div key={nestedKey}>
                      {renderHandoutData(
                        props.handoutDefinitionKey,
                        `${key}.${nestedKey}`,
                        nestedHandoutData,
                        _.get(props.dataset, `${key}`),
                        stateContext.onChange,
                        `${nestedKey}.value`
                      )}
                    </div>
                  );
                })}
              </div>
            </details>
          );
        }
      })}
    </div>
  );
};

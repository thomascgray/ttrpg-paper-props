import React from "react";
import {
  eHandoutDefinitions,
  iHandoutDefinition,
  isHandoutData,
  tHandoutData,
} from "./config";
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
import { BlendModeSelector } from "./components/TextFilterSelector";
import { ColourPicker } from "./components/ColourPicker";
import { nanoid } from "nanoid";

interface iConfigFormRendererProps {
  handoutDefinitionKey: eHandoutDefinitions;
  dataset: iHandoutDefinition["data"];
  config: iHandoutDefinition;
}

interface RenderHandoutDataArgs {
  compoundKey: string;
  config: tHandoutData;
  dataset: any;
  onChange: (key: string, value: any) => void;
  valueAccessKey: string;
  index?: number;
}

const renderHandoutData = (args: RenderHandoutDataArgs) => {
  const { compoundKey, config, dataset, onChange, valueAccessKey } = args;

  const val = _.get(dataset, valueAccessKey);
  const finalKey = `${compoundKey}`;

  if (typeof config === "string") {
    return null;
  }
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
          rows={20}
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

    case "blend_mode":
      return (
        <BlendModeSelector
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );

    case "color":
      return (
        <ColourPicker
          label={config.name}
          value={val}
          onUpdate={(newValue) => {
            onChange(finalKey, newValue);
          }}
        />
      );
    case "raw_image_url":
      return null;

    default:
      return <div>unknown type</div>;
  }
};

export const ConfigFormRenderer = (props: iConfigFormRendererProps) => {
  const { config } = props;

  let data = props.dataset;

  const stateContext = React.useContext(StateContext);

  return (
    <div className="space-y-4">
      {Object.keys(data).map((key) => {
        let config = data[key];

        if (key === "timestamp") {
          return null;
        }
        if (Array.isArray(config)) {
          return (
            <div key={key + "-top-level"} className="space-y-4">
              {config.map((configElement, index) => {
                if (isHandoutData(configElement)) {
                  // TODO this doesnt exist yet, cover it when we get to it
                } else {
                  return (
                    <details
                      onMouseEnter={() => stateContext.setHighlighted(key)}
                      onMouseLeave={() => stateContext.setHighlighted("")}
                      key={configElement.id as unknown as string}
                      className="bg-gray-400 space-y-4 p-2"
                    >
                      <summary className="cursor-pointer font-bold flex justify-between items-center">
                        <span>
                          {_.startCase(_.toLower(key))} {index + 1}
                        </span>
                        {index > 0 && (
                          <button
                            onClick={() => {
                              stateContext.onChange(`${key}::${index}`, null);
                            }}
                            className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-around hover:scale-125 active:scale-90 shadow-md"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-x stroke-2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                          </button>
                        )}
                      </summary>
                      <div className="flex flex-col space-y-4">
                        {Object.keys(configElement).map((nestedKey) => {
                          const nestedHandoutData = _.get(
                            config,
                            `[${index}].${nestedKey}`
                          ) as tHandoutData;
                          return (
                            <div key={nestedKey}>
                              {renderHandoutData({
                                compoundKey: `${key}[${index}].${nestedKey}`,
                                config: nestedHandoutData,
                                dataset: configElement,
                                onChange: stateContext.onChange,
                                valueAccessKey: `${nestedKey}.value`,
                                index,
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  );
                }
              })}

              <button
                onClick={() => {
                  const initialConfigElement = {
                    ...config[0],
                    id: nanoid(),
                  };
                  stateContext.onChange(
                    `${key}[${config.length}]`,
                    JSON.parse(JSON.stringify(initialConfigElement)),
                    true
                  );
                }}
                className="bg-green-500 hover:scale-110 active:scale-90 p-2 rounded-sm text-white"
              >
                Add {_.startCase(_.toLower(key))}
              </button>
            </div>
          );

          // it could be an array of handout data or the nested one
        } else if (isHandoutData(config)) {
          return (
            <div
              key={key}
              onMouseEnter={() => stateContext.setHighlighted(key)}
              onMouseLeave={() => stateContext.setHighlighted("")}
            >
              {renderHandoutData({
                compoundKey: key,
                config: data[key] as tHandoutData,
                dataset: _.get(props.dataset, key),
                onChange: stateContext.onChange,
                valueAccessKey: "value",
              })}
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
                      {renderHandoutData({
                        compoundKey: `${key}.${nestedKey}`,
                        config: nestedHandoutData,
                        dataset: _.get(props.dataset, `${key}`),
                        onChange: stateContext.onChange,
                        valueAccessKey: `${nestedKey}.value`,
                      })}
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

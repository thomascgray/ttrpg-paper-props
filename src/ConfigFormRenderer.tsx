import React from "react";
import { iHandoutDefinition, isHandoutData, tHandoutData } from "./config2";
import { RangeInput } from "./components/RangeInput";
import { StateContext } from "./context";

interface iConfigFormRendererProps {
  dataset: any;
  config: iHandoutDefinition;
}

const renderHandoutData = (
  key: string,
  data: tHandoutData,
  dataset: any,
  onChange: (key: string, value: any) => void
) => {
  if (data.type === "range") {
    return (
      <RangeInput
        label={data.name}
        value={dataset[key]}
        onUpdate={(newValue) => {
          onChange(key, newValue);
        }}
        suffix="px"
        min={26}
        max={200}
        step={2}
      />
    );
  } else if (data.type === "input") {
    return <div>input</div>;
  } else if (data.type === "ink_color_picker") {
    return <div>ink_color_picker</div>;
  } else if (data.type === "font_picker") {
    return <div>font_picker</div>;
  }
};

export const ConfigFormRenderer = (props: iConfigFormRendererProps) => {
  const { config } = props;

  const { name, data } = config;

  const stateContext = React.useContext(StateContext);

  return (
    <div>
      {Object.keys(data).map((key) => {
        if (isHandoutData(data[key])) {
          return (
            <div key={key}>
              {renderHandoutData(
                key,
                data[key],
                props.dataset,
                stateContext.onChange
              )}
            </div>
          );
        } else {
          return Object.keys(data[key]).map((nestedKey) => {
            const nestedHandoutData = (data[key] as any)[nestedKey];
            return (
              <div key={nestedKey}>
                {renderHandoutData(
                  `${key}.${nestedKey}`,
                  nestedHandoutData,
                  props.dataset,
                  stateContext.onChange
                )}
              </div>
            );
          });
        }
      })}
    </div>
  );
};

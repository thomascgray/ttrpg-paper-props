import React from "react";
import classnames from "classnames";
import { iStandardComponentProps } from "./";

export interface iButtonGroupProps extends iStandardComponentProps {
  tupleSet?: string[][];
  tupleSetElements?: any[][];
  buttonClassName?: string;
}

export const ButtonGroup = (props: iButtonGroupProps) => {
  return (
    <label className="block">
      <span className="block mb-1">
        {props.label}
        {props.caption && (
          <span className="block text-sm italic text-gray-700">
            {props.caption}
          </span>
        )}
      </span>

      <div className="flex space-x-4">
        {props.tupleSet != null &&
          props.tupleSet.map((tuple) => {
            const [val, label] = tuple;

            const firstCharacterOfLabel = label[0];
            const restOfLabel = label.substring(1);

            return (
              <button
                key={`${firstCharacterOfLabel}${val}`}
                className={classnames(
                  `h-10 px-2 border-4 border-solid border-gray-100 rounded shadow min-w-[50px]`,
                  { "border-red-400": props.value === val }
                )}
                onClick={() => {
                  props.onUpdate(val);
                }}
              >
                <span className="font-bold">{firstCharacterOfLabel}</span>
                <span className="font-normal">{restOfLabel}</span>
              </button>
            );
          })}
        {props.tupleSetElements != null &&
          props.tupleSetElements.map((tuple) => {
            const [val, label] = tuple;

            // const firstCharacterOfLabel = label[0];
            // const restOfLabel = label.substring(1);

            return (
              <button
                key={`${val}-${val}`}
                className={classnames(
                  `h-10 px-2 border-4 border-solid border-gray-100 rounded shadow min-w-[50px]`,
                  { "border-red-400": props.value === val }
                )}
                onClick={() => {
                  props.onUpdate(val);
                }}
              >
                {label}
              </button>
            );
          })}
      </div>
    </label>
  );
};

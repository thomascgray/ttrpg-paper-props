import React from "react";
import classnames from "classnames";
import { iStandardComponentProps } from "./";

export interface iButtonGroupProps extends iStandardComponentProps {
  tupleSet: string[][];
}

export const ButtonGroup = (props: iButtonGroupProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex space-x-4">
        {props.tupleSet.map((tuple) => {
          const [val, label] = tuple;

          const firstCharacterOfLabel = label[0];
          const restOfLabel = label.substring(1);

          return (
            <button
              className={classnames(
                `h-10 w-16 border-4 border-solid border-gray-100 font-bold`,
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
      </div>
    </label>
  );
};

import React from "react";

interface iInkColorSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

const colours = [
  ["black", "#2d3436"],
  ["red", "#c0392b"],
  ["green", "#27ae60"],
  ["blue", "#2980b9"],
  ["purple", "#4834d4"],
  ["silver", "#bdc3c7"],
];

export const InkColorSelector = (props: iInkColorSelector) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex space-x-4">
        {colours.map((colourTuple) => {
          const [colourName, hexCode] = colourTuple;

          return (
            <button
              style={{
                backgroundColor: hexCode,
              }}
              className="h-10 w-10 border-4 border-solid border-gray-100"
              onClick={() => {
                props.onUpdate(`ink-${colourName}`);
              }}
            ></button>
          );
        })}
      </div>
    </label>
  );
};

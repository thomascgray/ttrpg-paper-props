import classnames from "classnames";
import { iStandardComponentProps } from "./";

const colours = [
  ["black", "#2d3436"],
  ["red", "#c0392b"],
  ["green", "#27ae60"],
  ["blue", "#2980b9"],
  ["purple", "#4834d4"],
  ["silver", "#bdc3c7"],
  ["true-black", "#000"],
  ["true-white", "#FFF"],
];

export const InkColorSelector = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block">✒️ {props.label}</span>
      <div className="flex space-x-4">
        {colours.map((colourTuple) => {
          const [colourName, hexCode] = colourTuple;

          return (
            <button
              key={colourName}
              style={{
                backgroundColor: hexCode,
              }}
              className={classnames(
                `h-10 w-16 border-4 border-solid border-gray-100 rounded shadow`,
                { "border-red-400": props.value === `ink-${colourName}` }
              )}
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

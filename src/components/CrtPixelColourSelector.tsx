import classnames from "classnames";
import { iStandardComponentProps } from "./";
import { CrtScreenTextColor } from "../db";

const colours = [
  ["red", CrtScreenTextColor.RED],
  ["green", CrtScreenTextColor.GREEN],
  ["blue", CrtScreenTextColor.BLUE],
  ["white", CrtScreenTextColor.WHITE],
  ["pink", CrtScreenTextColor.PINK],
] as const;

export const CrtPixelColourSelector = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block">🖥️ {props.label}</span>
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
                { "border-red-400": props.value === hexCode }
              )}
              onClick={() => {
                props.onUpdate(hexCode);
              }}
            ></button>
          );
        })}
      </div>
    </label>
  );
};
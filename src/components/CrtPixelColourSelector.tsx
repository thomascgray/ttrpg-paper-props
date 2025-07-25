import classnames from "classnames";
import { iStandardComponentProps } from "./";
import { CrtScreenTextColor } from "../enums";

export const CrtPixelColourSelector = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block">🖥️ {props.label}</span>
      <div className="flex space-x-4">
        {CrtScreenTextColor.map((hexCode) => {
          return (
            <button
              key={hexCode}
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

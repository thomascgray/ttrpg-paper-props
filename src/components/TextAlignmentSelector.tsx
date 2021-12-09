import React from "react";
import classnames from "classnames";
import { iStandardComponentProps } from "./";

export const TextAlignmentSelector = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex space-x-4">
        <button
          className={classnames(
            `h-10 w-16 border-4 border-solid border-gray-100 font-bold`,
            { "border-red-400": props.value === "text-left" }
          )}
          onClick={() => {
            props.onUpdate(`text-left`);
          }}
        >
          L<span className="text-sm font-normal">eft</span>
        </button>
        <button
          className={classnames(
            `h-10 w-16 border-4 border-solid border-gray-100 font-bold`,
            { "border-red-400": props.value === "text-center" }
          )}
          onClick={() => {
            props.onUpdate(`text-center`);
          }}
        >
          C<span className="text-sm font-normal">enter</span>
        </button>
        <button
          className={classnames(
            `h-10 w-16 border-4 border-solid border-gray-100 font-bold`,
            { "border-red-400": props.value === "text-right" }
          )}
          onClick={() => {
            props.onUpdate(`text-right`);
          }}
        >
          R<span className="text-sm font-normal">ight</span>
        </button>
        <button
          className={classnames(
            `h-10 w-16 border-4 border-solid border-gray-100 font-bold`,
            { "border-red-400": props.value === "text-justify" }
          )}
          onClick={() => {
            props.onUpdate(`text-justify`);
          }}
        >
          J<span className="text-sm font-normal">ustify</span>
        </button>
      </div>
    </label>
  );
};

import React from "react";
import { iStandardComponentProps } from "./";

export const ColourPicker = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <input
          type={"color"}
          value={props.value}
          className="p-2 text-lg h-12 w-12"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        />
      </div>
    </label>
  );
};

import React from "react";
import { iStandardComponentProps } from "./";

export const TextInput = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <input
          value={props.value}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        />
      </div>
    </label>
  );
};

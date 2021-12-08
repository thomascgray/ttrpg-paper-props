import React from "react";
import { iStandardComponentProps } from "./";

export const ImageUrl = (props: iStandardComponentProps) => {
  return (
    <label className="block">
      <span className="block mb-1">Image URL</span>
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

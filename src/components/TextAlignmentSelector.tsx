import React from "react";

interface iTextAlignmentSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const TextAlignmentSelector = (props: iTextAlignmentSelector) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <select
          value={props.value}
          className={`p-2 text-lg w-full`}
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option value="text-left">Left</option>
          <option value="text-center">Center</option>
          <option value="text-right">Right</option>
          <option value="text-justify">Justify</option>
        </select>
      </div>
    </label>
  );
};

import React from "react";

interface iFontSizeSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
  options: {
    value: string;
    label: string;
  }[];
}

export const Select = (props: iFontSizeSelector) => {
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
          {props.options.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
        </select>
      </div>
    </label>
  );
};

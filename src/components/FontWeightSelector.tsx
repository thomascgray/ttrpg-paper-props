import React from "react";

interface iFontWeightSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const FontWeightSelector = (props: iFontWeightSelector) => {
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
          <option value="font-light">Light</option>
          <option value="font-normal">Normal</option>
          <option value="font-semibold">Semi-Bold</option>
          <option value="font-bold">Bold</option>
        </select>
      </div>
    </label>
  );
};

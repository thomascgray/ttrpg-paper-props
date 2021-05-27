import React from "react";

interface iFontSizeSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const FontSizeSelector = (props: iFontSizeSelector) => {
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
          <option value="prose-sm">Small</option>
          <option value="prose">Base</option>
          <option value="prose-lg">Large</option>
          <option value="prose-xl">X Large</option>
          <option value="prose-2xl">2X Large</option>
        </select>
      </div>
    </label>
  );
};

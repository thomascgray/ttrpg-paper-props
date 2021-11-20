import React from "react";

interface iBorderSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const BorderSelector = (props: iBorderSelector) => {
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
          <option value="none">None</option>
          <option value="grayscale(1)">Grayscale</option>
          <option value="sepia(1)">Sepia</option>
          <option value="grayscale(1) contrast(2)">
            Grayscale, High Contrast
          </option>
          <option value="grayscale(1) contrast(7)">
            Grayscale, Extreme Contrast
          </option>
        </select>
      </div>
    </label>
  );
};

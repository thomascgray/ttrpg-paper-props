import React from "react";

interface iImageFilterSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const ImageFilterSelector = (props: iImageFilterSelector) => {
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
          <option value="img-filter-none">None</option>
          <option value="img-filter-grayscale">Grayscale</option>
          <option value="img-filter-sepia">Sepia</option>
          <option value="img-filter-medium-contrast">Medium Contrast</option>
          <option value="img-filter-high-contrast">High Contrast</option>
          <option value="img-filter-grayscale-medium-contrast">
            Grayscale, Medium Contrast
          </option>
          <option value="img-filter-grayscale-high-contrast">
            Grayscale, High Contrast
          </option>
          <option value="img-filter-grayscale-extreme-contrast">
            Grayscale, Extreme Contrast
          </option>
        </select>
      </div>
    </label>
  );
};

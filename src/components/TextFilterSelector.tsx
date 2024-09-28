import React from "react";

interface iTextFilterSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const TextFilterSelector = (props: iTextFilterSelector) => {
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
          <option value="text-filter-none">None</option>
          <option value="text-filter-embossed">Embossed</option>
          <option value="text-filter-color-multiply">color-multiply</option>
          <option value="text-filter-color-burn">color-burn</option>
          <option value="text-filter-overlay">overlay</option>
        </select>
      </div>
    </label>
  );
};

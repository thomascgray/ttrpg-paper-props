import React from "react";

interface iTextColorSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const TextColorSelector = (props: iTextColorSelector) => {
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
          <option value="text-flat-black">Black</option>
          <option value="text-flat-red">Red</option>
        </select>
      </div>
    </label>
  );
};

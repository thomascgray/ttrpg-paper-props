import React from "react";

interface iBorderRadiusSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const BorderRadiusSelector = (props: iBorderRadiusSelector) => {
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
          <option value="rounded-none">None</option>
          <option value="rounded">Small</option>
          <option value="rounded-lg">Medium</option>
          <option value="rounded-3xl">Large</option>
          <option value="rounded-full">Huge</option>
        </select>
      </div>
    </label>
  );
};

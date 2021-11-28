import React from "react";

interface iInkColorSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const InkColorSelector = (props: iInkColorSelector) => {
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
          <option value="ink-black">Black</option>
          <option value="ink-red">Red</option>
          <option value="ink-green">Green</option>
          <option value="ink-blue">Blue</option>
          <option value="ink-purple">Purple</option>
          <option value="ink-silver">Silver</option>
        </select>
      </div>
    </label>
  );
};

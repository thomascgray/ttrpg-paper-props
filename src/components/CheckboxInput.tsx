import React from "react";

interface iCheckboxInputProps {
  label: string;
  value: boolean;
  onUpdate: (value: any) => void;
}

export const CheckboxInput = (props: iCheckboxInputProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <input
          type="checkbox"
          checked={props.value}
          className="p-2 ml-1 mt-1 transform scale-150"
          onChange={(e) => {
            props.onUpdate(e.target.checked);
          }}
        />
      </div>
    </label>
  );
};

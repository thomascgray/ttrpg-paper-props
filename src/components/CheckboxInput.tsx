import React from "react";

interface iCheckboxInputProps {
  label: string;
  value: boolean;
  onUpdate: (value: any) => void;
}

export const CheckboxInput = (props: iCheckboxInputProps) => {
  return (
    <label className="block">
      <div className="flex flex-row items-center">
        <span className="block mr-4">{props.label}</span>
        <input
          type="checkbox"
          checked={props.value}
          className="p-2 ml-1 mt-1 transform scale-150 text-red-500"
          onChange={(e) => {
            props.onUpdate(e.target.checked);
          }}
        />
      </div>
    </label>
  );
};

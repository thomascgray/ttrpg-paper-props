import React from "react";

interface iTextInputProps {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const TextInput = (props: iTextInputProps) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <input
          value={props.value}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        />
      </div>
    </label>
  );
};

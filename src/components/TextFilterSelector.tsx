import React from "react";

interface iTextFilterSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const BlendModeSelector = (props: iTextFilterSelector) => {
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
          <option value="blend-mode-normal">Normal</option>
          <option value="blend-mode-multiply">Multiply</option>
          <option value="blend-mode-screen">Screen</option>
          <option value="blend-mode-overlay">Overlay</option>
          <option value="blend-mode-darken">Darken</option>
          <option value="blend-mode-lighten">Lighten</option>
          <option value="blend-mode-color-dodge">Color-dodge</option>
          <option value="blend-mode-color-burn">Color-burn</option>
          <option value="blend-mode-hard-light">Hard-light</option>
          <option value="blend-mode-soft-light">Soft-light</option>
          <option value="blend-mode-difference">Difference</option>
          <option value="blend-mode-exclusion">Exclusion</option>
          <option value="blend-mode-hue">Hue</option>
          <option value="blend-mode-saturation">Saturation</option>
          <option value="blend-mode-color">Color</option>
          <option value="blend-mode-luminosity">Luminosity</option>
          <option value="blend-mode-plus-darker">Plus-darker</option>
          <option value="blend-mode-plus-lighter">Plus-lighter</option>
        </select>
      </div>
    </label>
  );
};

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
          <option value="blend-mode-normal">normal</option>
          <option value="blend-mode-multiply">multiply</option>
          <option value="blend-mode-screen">screen</option>
          <option value="blend-mode-overlay">overlay</option>
          <option value="blend-mode-darken">darken</option>
          <option value="blend-mode-lighten">lighten</option>
          <option value="blend-mode-color-dodge">color-dodge</option>
          <option value="blend-mode-color-burn">color-burn</option>
          <option value="blend-mode-hard-light">hard-light</option>
          <option value="blend-mode-soft-light">soft-light</option>
          <option value="blend-mode-difference">difference</option>
          <option value="blend-mode-exclusion">exclusion</option>
          <option value="blend-mode-hue">hue</option>
          <option value="blend-mode-saturation">saturation</option>
          <option value="blend-mode-color">color</option>
          <option value="blend-mode-luminosity">luminosity</option>
          <option value="blend-mode-plus-darker">plus-darker</option>
          <option value="blend-mode-plus-lighter">plus-lighter</option>
        </select>
      </div>
    </label>
  );
};

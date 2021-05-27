import React from "react";

interface iFontSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const FontSelector = (props: iFontSelector) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <select
          value={props.value}
          className={`p-2 text-lg w-full ${props.value}`}
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option className="font-serif" value="font-serif">
            Standard Web Serif
          </option>
          <option className="font-sans" value="font-sans">
            Standard Web Sans
          </option>
          <option className="font-alfa-slab-one" value="font-alfa-slab-one">
            Alfa Slab One
          </option>
          <option className="font-newsreader" value="font-newsreader">
            Newsreader
          </option>
          <option className="font-noticia-text" value="font-noticia-text">
            Noticia Text
          </option>
          <option className="font-indie-flower" value="font-indie-flower">
            Indie Flower
          </option>
          <option className="font-dancing-script" value="font-dancing-script">
            Dancing Script
          </option>
        </select>
      </div>
    </label>
  );
};

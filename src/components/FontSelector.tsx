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
          {/* serif fonts */}
          <optgroup className="font-sans" label="Serif">
            <option className="font-serif" value="font-serif">
              Standard Web Serif
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
            <option className="font-yuji-syuku" value="font-yuji-syuku">
              Yuji Syuku
            </option>
            <option className="font-crete-round" value="font-crete-round">
              Crete Round
            </option>
            <option
              className="font-playfair-display-sc"
              value="font-playfair-display-sc"
            >
              Playfair Display SC
            </option>
            <option className="font-quattrocento" value="font-quattrocento">
              Quattrocento
            </option>

            <option className="font-im-fell" value="font-im-fell">
              IM Fell
            </option>

            <option
              className="font-im-fell-display"
              value="font-im-fell-display"
            >
              IM Fell Display
            </option>
          </optgroup>

          {/* sans serif fonts */}

          <optgroup className="font-sans" label="Sans Serif">
            <option className="font-sans" value="font-sans">
              Standard Web Sans
            </option>
          </optgroup>

          <optgroup className="font-sans" label="Cursive/Handwriting">
            <option className="font-cursive" value="font-cursive">
              Standard Web Cursive
            </option>
            <option className="font-indie-flower" value="font-indie-flower">
              Indie Flower
            </option>
            <option className="font-dancing-script" value="font-dancing-script">
              Dancing Script
            </option>
            <option className="font-zeyada" value="font-zeyada">
              Zeyada
            </option>
            <option className="font-merienda" value="font-merienda">
              Merienda
            </option>
            <option
              className="font-shadows-into-light"
              value="font-shadows-into-light"
            >
              Shadows Into Light
            </option>
            <option className="font-caveat" value="font-caveat">
              Caveat
            </option>
          </optgroup>

          <optgroup className="font-sans" label="Fantasy">
            <option className="font-medieval-sharp" value="font-medieval-sharp">
              Medieval Sharp
            </option>
            <option
              className="font-macondo-regular"
              value="font-macondo-regular"
            >
              Macondo
            </option>
            <option
              className="font-macondo-swash-caps"
              value="font-macondo-swash-caps"
            >
              Macondo Swash Caps
            </option>
            <option
              className="font-unifrakturmaguntia"
              value="font-unifrakturmaguntia"
            >
              Unifrakturmaguntia
            </option>
            <option className="font-unifrakturcook" value="font-unifrakturcook">
              Unifrakturcook
            </option>
            <option className="font-pirata-one" value="font-pirata-one">
              Pirata One
            </option>
            <option className="font-new-rocker" value="font-new-rocker">
              New Rocker
            </option>
          </optgroup>
        </select>
      </div>
    </label>
  );
};

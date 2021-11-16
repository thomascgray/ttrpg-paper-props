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
          <option className="font-serif" value="font-serif">
            Standard Web Serif
          </option>
          <option className="font-alfa-slab-one" value="font-alfa-slab-one">
            ↪ Alfa Slab One
          </option>
          <option className="font-newsreader" value="font-newsreader">
            ↪ Newsreader
          </option>
          <option className="font-noticia-text" value="font-noticia-text">
            ↪ Noticia Text
          </option>
          <option className="font-yuji-syuku" value="font-yuji-syuku">
            ↪ Yuji Syuku
          </option>
          <option className="font-crete-round" value="font-crete-round">
            ↪ Crete Round
          </option>
          <option
            className="font-playfair-display-sc"
            value="font-playfair-display-sc"
          >
            ↪ Playfair Display SC
          </option>
          <option className="font-quattrocento" value="font-quattrocento">
            ↪ Quattrocento
          </option>

          <option className="font-im-fell" value="font-im-fell">
            ↪ IM Fell
          </option>

          <option className="font-im-fell-display" value="font-im-fell-display">
            ↪ IM Fell Display
          </option>

          {/* sans serif fonts */}

          <option className="font-sans" value="font-sans">
            Standard Web Sans
          </option>

          <option className="font-cursive" value="font-cursive">
            Standard Web Cursive
          </option>
          <option className="font-indie-flower" value="font-indie-flower">
            ↪ Indie Flower
          </option>
          <option className="font-dancing-script" value="font-dancing-script">
            ↪ Dancing Script
          </option>

          <option className="font-fantasy" value="font-fantasy">
            Standard Web Fantasy
          </option>

          <option className="font-medieval-sharp" value="font-medieval-sharp">
            ↪ Medieval Sharp
          </option>
        </select>
      </div>
    </label>
  );
};

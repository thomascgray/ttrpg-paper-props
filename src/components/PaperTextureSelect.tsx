import React from "react";

interface iPaperTextureSelect {
  value: string;
  onUpdate: (value: any) => void;
}

export const PaperTextureSelect = (props: iPaperTextureSelect) => {
  return (
    <label className="block">
      <span className="block mb-1">📜 Paper Texture</span>
      <div className="flex">
        <select
          value={props.value}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option value="none">None</option>
          <option value="grey">Grey</option>
          <option value="white">White, Zoomed, Rough</option>
          <option value="beige">Beige</option>
          <option value="beige-2">Beige (High Saturation)</option>
          <option value="beige-3">Beige, Zoomed, Rough 1</option>
          <option value="cream">Cream</option>
          <option value="cream-2">Cream 2</option>
          <option value="stained">Paper, Yellow Stain</option>
        </select>
      </div>
    </label>
  );
};

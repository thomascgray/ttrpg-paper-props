import React from "react";

interface iPaperTextureSelect {
  value: string;
  onUpdate: (value: any) => void;
}

export const PaperTextureSelect = (props: iPaperTextureSelect) => {
  return (
    <label className="block">
      <span className="block mb-1">Paper Texture</span>
      <div className="flex">
        <select
          value={props.value}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option value="grey">Grey</option>
          <option value="beige">Beige</option>
          <option value="cream">Cream</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </label>
  );
};

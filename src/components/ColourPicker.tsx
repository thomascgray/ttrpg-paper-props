import React from "react";
import { iStandardComponentProps } from "./";

export const ColourPicker = (props: iStandardComponentProps) => {
  const colours = [
    "#FFFFFF",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#3498db",
    "#9b59b6",
    "#2ecc71",
    "#1abc9c",
    "#000000",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#2980b9",
    "#8e44ad",
    "#27ae60",
    "#16a085",
  ];
  return (
    <div className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex justify-between items-center">
        <input
          type={"color"}
          value={props.value}
          className="p-2 text-lg h-20 w-20"
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        />

        <div className="grid grid-cols-8 grid-rows-2 gap-2 mr-4">
          {colours.map((color) => {
            return (
              <button
                key={color}
                style={{
                  backgroundColor: color,
                }}
                className="rounded-full w-6 h-6"
                onClick={() => props.onUpdate(color)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

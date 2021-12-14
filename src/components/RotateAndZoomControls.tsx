import React from "react";

interface iRotateAndZoomControlsProps {
  zoomValue: any;
  rotateValue: any;
  onZoomUpdate: (value: string) => void;
  onRotateUpdate: (value: string) => void;
}

export const RotateAndZoomControls = (props: iRotateAndZoomControlsProps) => {
  return (
    <div>
      <div className="flex">
        <label className="block w-1/2 mr-2">
          <span className="block mb-1">
            Zoom: <span className="font-bold">{props.zoomValue}</span>
          </span>
          <input
            className="w-full cursor-pointer bg-red-500"
            type="range"
            value={props.zoomValue}
            onChange={(e) => {
              props.onZoomUpdate(e.target.value);
            }}
            step="0.25"
            min="0"
            max="2"
          />
        </label>

        <label className="block w-1/2">
          <span className="block mb-1">
            Rotation: <span className="font-bold">{props.rotateValue}°</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.rotateValue}
            onChange={(e) => {
              props.onRotateUpdate(e.target.value);
            }}
            step="2"
            min="-20"
            max="20"
          />
        </label>
      </div>
    </div>
  );
};

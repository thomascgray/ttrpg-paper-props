import React from "react";

interface iRotateAndZoomControlsProps {
  zoomValue: any;
  rotateValue: any;
  xOffsetValue: number;
  yOffsetValue: number;
  onZoomUpdate: (value: string) => void;
  onRotateUpdate: (value: string) => void;
  onXOffsetUpdate: (xOffset: any) => void;
  onYOffsetUpdate: (yOffset: any) => void;
  onReset: () => void;
}

export const RotateZoomPositionControls = (
  props: iRotateAndZoomControlsProps
) => {
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
            step="0.01"
            min="0"
            max="6"
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
            min="-60"
            max="60"
          />
        </label>
      </div>

      <div className="flex">
        <label className="block w-1/2">
          <span className="block mb-1">
            X Offset:{" "}
            <span className="font-bold">{props.xOffsetValue || 0}%</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.xOffsetValue || 0}
            onChange={(e) => {
              props.onXOffsetUpdate(parseInt(e.target.value));
            }}
            step="1"
            min="-100"
            max="100"
          />
        </label>

        <label className="block w-1/2">
          <span className="block mb-1">
            Y Offset:{" "}
            <span className="font-bold">{props.yOffsetValue || 0}%</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.yOffsetValue || 0}
            onChange={(e) => {
              props.onYOffsetUpdate(parseInt(e.target.value));
            }}
            step="1"
            min="-100"
            max="100"
          />
        </label>
      </div>

      <button
        onClick={() => {
          props.onReset();
        }}
        className="text-xs text-white bg-zinc-600 px-2 py-1"
      >
        Reset
      </button>
    </div>
  );
};

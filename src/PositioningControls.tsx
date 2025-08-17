import { useSnapshot } from "valtio";
import { Icon } from "./Icon";
import { appState as appStateProxy } from "./appState";
import classNames from "classnames";
import { AngleSlider } from "@mantine/core";
import XYPicker from "./components/XYPicker";
import { RangeInput } from "./components/RangeInput";
import { useState } from "react";
import { flushSync } from "react-dom";

interface PositioningControlsProps {
  data: Record<string, any>;
  onChange: (path: string, value: any) => void;
  onResetData: () => void;
  onUpdateOffsets: (xOffset: number, yOffset: number) => void;
}

export const PositioningControls = ({
  data,
  onChange,
  onResetData,
  onUpdateOffsets,
}: PositioningControlsProps) => {
  const appState = useSnapshot(appStateProxy);
  const isOpen = appState.positioningControls === "open";

  // Get positioning values with defaults
  const positioning = data?.positioning || {};
  const rotation = positioning.rotation ?? 0;
  const zoom = positioning.zoom ?? 1;
  const xOffset = positioning.xOffset ?? 0;
  const yOffset = positioning.yOffset ?? 0;

  return (
    <div
      className={classNames(
        "absolute top-4 left-[50%] -translate-x-[50%] transition-all z-50",
        {
          "bg-slate-500 p-4 rounded-md": isOpen,
        }
      )}
    >
      {!isOpen && (
        <button
          onClick={() => {
            appStateProxy.positioningControls = "open";
          }}
          className="bg-slate-500 px-3 py-1 rounded-full hover:-translate-y-1 active:scale-90 transition-transform"
        >
          <span className="flex items-center gap-2">
            <Icon name="adjustments-horizontal" colour="white" size="sm" />
            <span className="text-white font-bold text-sm">
              Positioning Controls
            </span>
          </span>
        </button>
      )}

      {isOpen && (
        <>
          <div className="w-[70vw] md:w-[30vw] xl:w-[20vw]">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white text-md font-bold">
                  Positioning Controls
                </h3>
              </div>
              <div className="flex flex-row gap-4 justify-between">
                {/* zoom and rotate */}
                <div className="flex flex-col gap-4">
                  <div className="zoom">
                    <label className="text-white font-bold">Zoom: {zoom}</label>
                    <RangeInput
                      value={zoom}
                      onUpdate={(value) => onChange("positioning.zoom", value)}
                      min={0.1}
                      max={6}
                      step={0.1}
                      suffix={""}
                    />
                  </div>
                  <div className="rotate">
                    <label className="text-white font-bold">
                      Rotation: {rotation}°
                    </label>
                    <AngleSlider
                      aria-label="Angle slider"
                      size={60}
                      thumbSize={8}
                      value={rotation}
                      formatLabel={(value) => `${value}°`}
                      onChange={(value) =>
                        onChange("positioning.rotation", value)
                      }
                    />
                  </div>
                </div>

                {/* position */}
                <div className="">
                  <label className="text-white font-bold">
                    X/Y Offset:
                    <br />
                    {xOffset}, {yOffset}
                  </label>

                  <XYPicker
                    initialValue={{ x: xOffset, y: yOffset }}
                    onChange={(value) => {
                      onUpdateOffsets(value.x, value.y);
                    }}
                  />
                  <p className="text-white"></p>
                </div>
              </div>
            </div>
          </div>

          {/* reset button */}
          <button
            onClick={() => {
              onResetData();
            }}
            className="absolute top-2 right-10 bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1 rounded transition-colors"
            title="Reset all positioning values to defaults"
          >
            Reset
          </button>

          {/* close button */}
          <button
            onClick={() => {
              appStateProxy.positioningControls = "closed";
            }}
            className="absolute top-2 right-2 bg-red-500 rounded-full active:scale-90 transition-transform p-1"
          >
            <Icon name="x" colour="white" size="sm" />
          </button>
        </>
      )}
    </div>
  );
};

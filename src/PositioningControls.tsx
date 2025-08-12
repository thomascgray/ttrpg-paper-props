import { SignedIn, SignedOut, UserButton, Waitlist } from "@clerk/clerk-react";
import { useSnapshot } from "valtio";
import { Icon } from "./Icon";
import { appState as appStateProxy } from "./appState";
import classNames from "classnames";
import { AngleSlider } from "@mantine/core";
import XYPicker from "./components/XYPicker";
import { RangeInput } from "./components/RangeInput";
export const PositioningControls = () => {
  const appState = useSnapshot(appStateProxy);
  const isOpen = appState.positioningControls === "open";

  return (
    <div
      className={classNames(
        "fixed top-4 left-[50%] -translate-x-[50%] transition-all z-50",
        {
          "bg-slate-500 p-4 rounded-md": isOpen,
        }
      )}
    >
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
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
            <div className="min-w-[300px] max-w-[400px]">
              <div className="mb-4">
                <h3 className="text-white text-md font-bold">
                  Positioning Controls
                </h3>
                <div className="controls flex gap-4">
                  <div className="zoom">
                    <RangeInput
                      //   key={path}
                      label={"Zoom"}
                      value={"1"}
                      onUpdate={() => {}}
                      min={0.15}
                      max={6}
                      step={0.05}
                      suffix={""}
                    />
                  </div>
                  <div className="rotate">
                    <AngleSlider
                      aria-label="Angle slider"
                      size={60}
                      thumbSize={8}
                    />
                  </div>
                  <div>
                    <XYPicker
                      //   key={path}
                      // label={name}
                      initialValue={{ x: 0, y: 0 }}
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                appStateProxy.positioningControls = "closed";
              }}
              className="absolute top-2 right-2 bg-red-500 rounded-full hover:-translate-y-1 active:scale-90 transition-transform p-1"
            >
              <Icon name="x" colour="white" size="sm" />
            </button>
          </>
        )}
      </SignedOut>
    </div>
  );
};

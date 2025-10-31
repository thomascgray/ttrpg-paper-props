import { useSnapshot } from "valtio";
import { Icon } from "./Icon";
import { appState as appStateProxy } from "./appState";
import classNames from "classnames";
import { ColourPicker } from "./components/ColourPicker";
import { ImageInput } from "./components/ImageInput";

export const BackgroundSelector = () => {
  const appState = useSnapshot(appStateProxy);

  const isOpen = appState.backgroundSelectorState === "open";
  return (
    <div
      className={classNames(
        "fixed md:absolute bottom-9 left-5 transition-all z-50",
        {
          "bg-gray-400 p-4 rounded-md": isOpen,
        }
      )}
    >
      {!isOpen && (
        <button
          onClick={() => {
            appStateProxy.backgroundSelectorState = "open";
          }}
          className="flex items-center gap-2 px-3 py-2 background-selector bg-green-600 hover:bg-green-700 rounded-lg active:scale-95 transition-transform"
        >
          <Icon name="photo" colour="white" size="md" />
          <span className="text-white text-sm font-bold">Background</span>
        </button>
      )}
      {isOpen && (
        <span className="text-white text-xl font-bold mb-4 block">
          Background Selector
        </span>
      )}
      {isOpen && (
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="backgroundType"
                value="color"
                checked={appState.backgroundType === "color"}
                onChange={() => {
                  appStateProxy.backgroundType = "color";
                }}
                className="w-4 h-4"
              />
              <span className="text-white">Flat Color</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="backgroundType"
                value="gradient"
                checked={appState.backgroundType === "gradient"}
                onChange={() => {
                  appStateProxy.backgroundType = "gradient";
                }}
                className="w-4 h-4"
              />
              <span className="text-white">Gradient</span>
            </label>

            {/* <label className="flex items-center gap-2 opacity-50 cursor-not-allowed">
              <input
                type="radio"
                name="backgroundType"
                value="predefined"
                disabled
                className="w-4 h-4"
              />
              <span className="text-white">Predefined Images (Coming Soon)</span>
            </label> */}

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="backgroundType"
                value="custom"
                checked={appState.backgroundType === "custom"}
                onChange={() => {
                  appStateProxy.backgroundType = "custom";
                }}
                className="w-4 h-4"
              />
              <span className="text-white">Custom Image</span>
            </label>
          </div>

          {appState.backgroundType === "color" && (
            <div className="mt-4">
              <ColourPicker
                label="Background Color"
                value={appState.backgroundColor}
                onUpdate={(value) => {
                  appStateProxy.backgroundColor = value;
                }}
              />
            </div>
          )}

          {appState.backgroundType === "gradient" && (
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-white mb-2">Gradient Type</label>
                <select
                  value={appState.backgroundGradientType}
                  onChange={(e) => {
                    appStateProxy.backgroundGradientType = e.target.value as
                      | "linear"
                      | "radial"
                      | "conic";
                  }}
                  className="w-full p-2 rounded"
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
              </div>

              <ColourPicker
                label="Start Color"
                value={appState.backgroundGradientStart}
                onUpdate={(value) => {
                  appStateProxy.backgroundGradientStart = value;
                }}
              />

              <ColourPicker
                label="End Color"
                value={appState.backgroundGradientEnd}
                onUpdate={(value) => {
                  appStateProxy.backgroundGradientEnd = value;
                }}
              />

              <button
                onClick={() => {
                  const temp = appStateProxy.backgroundGradientStart;
                  appStateProxy.backgroundGradientStart =
                    appStateProxy.backgroundGradientEnd;
                  appStateProxy.backgroundGradientEnd = temp;
                }}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Swap Colors
              </button>

              {appState.backgroundGradientType === "linear" && (
                <div>
                  <label className="block text-white mb-2">
                    Angle: {appState.backgroundGradientAngle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={appState.backgroundGradientAngle}
                    onChange={(e) => {
                      appStateProxy.backgroundGradientAngle = parseInt(
                        e.target.value
                      );
                    }}
                    className="w-full"
                  />
                </div>
              )}

              {appState.backgroundGradientType === "radial" && (
                <div>
                  <label className="block text-white mb-2">Position</label>
                  <select
                    value={appState.backgroundGradientPosition}
                    onChange={(e) => {
                      appStateProxy.backgroundGradientPosition = e.target.value;
                    }}
                    className="w-full p-2 rounded"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="top left">Top Left</option>
                    <option value="top right">Top Right</option>
                    <option value="bottom left">Bottom Left</option>
                    <option value="bottom right">Bottom Right</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {appState.backgroundType === "custom" && (
            <div className="mt-4 space-y-4">
              <ImageInput
                label="Background Image"
                value={appState.backgroundCustomImage}
                onUpdate={(value) => {
                  appStateProxy.backgroundCustomImage = value;
                }}
              />

              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={appState.backgroundImageBlur}
                  onChange={(e) => {
                    appStateProxy.backgroundImageBlur = e.target.checked;
                  }}
                  className="w-4 h-4"
                />
                <span>Apply blur effect</span>
              </label>

              <div>
                <label className="block text-white mb-2">
                  Zoom: {Math.round(appState.backgroundImageZoom * 100)}%
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={appState.backgroundImageZoom}
                  onChange={(e) => {
                    appStateProxy.backgroundImageZoom = parseFloat(
                      e.target.value
                    );
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <button
          onClick={() => {
            appStateProxy.backgroundSelectorState =
              appState.backgroundSelectorState === "closed" ? "open" : "closed";
          }}
          className="absolute top-2 right-2 bg-red-500 rounded-full hover:-translate-y-1 active:scale-90 transition-transform p-1"
        >
          <Icon name="x" colour="white" size="md" />
        </button>
      )}
    </div>
  );
};

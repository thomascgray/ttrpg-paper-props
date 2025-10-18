import * as _ from "lodash";
import { useSnapshot } from "valtio";
import { appState as appStateProxy } from "./appState";
import { AllConfigNames, allConfigs } from "./handoutConfigs";

interface HandoutTypeSelectorProps {
  onSelect?: () => void;
}

export const HandoutTypeSelector = ({ onSelect }: HandoutTypeSelectorProps = {}) => {
  const appState = useSnapshot(appStateProxy);

  const selectedConfig = allConfigs.find(
    (config) => config.name === appState.selectedHandoutType
  );
  
  const handleHandoutTypeChange = async (newType: AllConfigNames) => {
    appStateProxy.selectedHandoutType = newType;
    appStateProxy.selectedVersionId = "TRANSIENT";
    
    // Reset positioning controls when changing handout type
    const { db } = await import('./database');
    db.handouts
      .where("id")
      .equals(`TRANSIENT_${newType}`)
      .modify((handout: any) => {
        if (!handout.data.positioning) {
          handout.data.positioning = {};
        }
        handout.data.positioning.rotation = 0;
        handout.data.positioning.zoom = 1;
        handout.data.positioning.xOffset = 0;
        handout.data.positioning.yOffset = 0;
      });
    
    // Call onSelect callback if provided (for mobile drawer closing)
    onSelect?.();
  };
  
  return (
    <>
      <label className="block mb-4">
        <span className="block mb-1 font-bold">Handout Type</span>
        <select
          value={appState.selectedHandoutType}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            handleHandoutTypeChange(e.target.value as AllConfigNames);
          }}
        >
          <optgroup label="'Pseudo' Paper / Print">
            {allConfigs
              .filter((config) => config.type === "digital_paper")
              .map((config) => {
                return (
                  <option key={config.name} value={config.name}>
                    {config.displayName}
                  </option>
                );
              })}
          </optgroup>
          <optgroup label="Sci-fi Screens">
            {allConfigs
              .filter((config) => config.type === "scifi_screens")
              .map((config) => {
                return (
                  <option key={config.name} value={config.name}>
                    {config.displayName}
                  </option>
                );
              })}
          </optgroup>
          <optgroup label="Objects">
            {allConfigs
              .filter((config) => config.type === "object")
              .map((config) => {
                return (
                  <option key={config.name} value={config.name}>
                    {config.displayName}
                  </option>
                );
              })}
          </optgroup>
          <optgroup label="Wooden Signs">
            {allConfigs
              .filter((config) => config.type === "wooden_signs")
              .map((config) => {
                return (
                  <option key={config.name} value={config.name}>
                    {config.displayName}
                  </option>
                );
              })}
          </optgroup>
          <optgroup label="Flags and Banners">
            {allConfigs
              .filter((config) => config.type === "flags_and_banners")
              .map((config) => {
                return (
                  <option key={config.name} value={config.name}>
                    {config.displayName}
                  </option>
                );
              })}
          </optgroup>
        </select>
      </label>
      <p className="text-sm mb-4">{selectedConfig?.caption}</p>
    </>
  );
};

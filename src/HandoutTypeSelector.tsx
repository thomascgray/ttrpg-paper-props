import { FormRenderer } from "./FormRenderer";
import * as _ from "lodash";
import { useSnapshot } from "valtio";
import { appState as appStateProxy } from "./db";
import {
  AllConfigNames,
  allConfigs,
  extractConfigAsData,
  extractConfigAsFormConfig,
} from "./db";
export const HandoutTypeSelector = () => {
  const appState = useSnapshot(appStateProxy);

  const selectedConfig = allConfigs.find(
    (config) => config.name === appState.selectedHandoutType
  );
  return (
    <>
      <label className="block mb-4">
        <span className="block mb-1">Handout Type</span>
        <select
          value={appState.selectedHandoutType}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            appStateProxy.selectedHandoutType = e.target
              .value as AllConfigNames;
            appStateProxy.selectedVersionId = "TRANSIENT";
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
          {/* <optgroup label="Objects w/ Superimposed Text">
                          {allConfigs.filter(config => config.type === "object").map((config) => {
                            return (
                              <option key={config.name} value={config.name}>
                                {config.name}
                              </option>
                            );
                          })}
                        </optgroup> */}
        </select>
      </label>
      <p className="text-sm mb-4">{selectedConfig?.caption}</p>
    </>
  );
};

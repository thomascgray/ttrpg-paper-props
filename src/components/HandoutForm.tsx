import React from "react";
import {
  eHandoutDefinitions,
  iHandoutDefinition,
  DIGITAL_PAPER_DEFINITIONS,
  OBJECT_DEFINITIONS,
} from "../config";
import { ConfigFormRenderer } from "../ConfigFormRenderer";
import { VersionSelector } from "./VersionSelector";

import { AllConfigNames, allConfigs } from "../db";

interface HandoutFormProps {
  currentHandoutDefinitionKey: AllConfigNames;
  currentHandoutConfig: any;
  currentHandoutData: iHandoutDefinition["data"];
  versionsList: any[];
  selectedVersion: string | null;
  onHandoutTypeChange: (type: eHandoutDefinitions) => void;
  onSave: () => void;
  onVersionSelect: (timestamp: string) => void;
}

export const HandoutForm: React.FC<HandoutFormProps> = ({
  currentHandoutDefinitionKey,
  currentHandoutConfig,
  currentHandoutData,
  versionsList,
  selectedVersion,
  onHandoutTypeChange,
  onSave,
  onVersionSelect,
}) => {
  console.log("currentHandoutDefinitionKey", currentHandoutDefinitionKey);
  return (
    <div className="form bg-gray-300 z-20 md:overflow-y-scroll pb-20 md:h-[100vh] md:w-1/3 md:min-w-[400px] md:max-w-md">
      <div className="bg-gray-300 p-4">
        <h1 className="text-xl font-poppins font-bold mb-4">
          📜 Tom G's RPG Handout Builder
        </h1>

        <label className="block mb-4">
          <span className="block mb-1">Handout Type</span>
          <select
            value={currentHandoutDefinitionKey}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              onHandoutTypeChange(e.target.value as eHandoutDefinitions);
            }}
          >
            <optgroup label="'Pseudo' Paper / Print">
              {allConfigs
                .filter((config) => config.type === "digital_paper")
                .map((config) => {
                  return (
                    <option key={config.name} value={config.name}>
                      {config.name}
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

        <span className="text-sm">{currentHandoutConfig.caption || ""}</span>
      </div>

      <VersionSelector
        versionsList={versionsList}
        selectedVersion={selectedVersion}
        onSave={onSave}
        onVersionSelect={onVersionSelect}
      />

      <div className="bg-gray-300 p-4">
        <ConfigFormRenderer
          handoutDefinitionKey={currentHandoutDefinitionKey}
          config={currentHandoutConfig as any}
          dataset={currentHandoutData}
        />

        <span className="block mt-6">
          Made by{" "}
          <a
            className="text-blue-600 underline hover:text-blue-900"
            target="_blank"
            href="https://tomg.cool/"
          >
            Tom
          </a>
        </span>
        <span className="italic text-sm">
          This tool is in alpha and constant flux. Apologies for any bugs!
        </span>
      </div>
    </div>
  );
};

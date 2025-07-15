import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { StateContext } from "./context";
import { allConfigs, extractConfigAsFormConfig } from "./db";
import { FormRenderer } from "./FormRenderer";
import * as _ from "lodash";
import { snapshot, useSnapshot } from "valtio";
import {
  appState as appStateProxy,
  db,
  saveVersion,
  updateTransientRecordToVersion,
} from "./db";
import { HandoutTypeSelector } from "./HandoutTypeSelector";
import { VersionSelector } from "./components/VersionSelector";
import { useLiveQuery } from "dexie-react-hooks";
import { Newspaper } from "./renderer/Newspaper";
import { performMigrationIfNeeded } from "./utils/versionMigration";

function App() {
  const appState = useSnapshot(appStateProxy);

  const [highlighted, setHighlighted] = useState("");

  const selectedConfig = allConfigs.find(
    (config) => config.name === appState.selectedHandoutType
  )!;

  const formConfig = extractConfigAsFormConfig(selectedConfig.config);

  const currentHandoutTransientRow = useLiveQuery(() => {
    return db.handouts
      .where("id")
      .equals(`TRANSIENT_${appState.selectedHandoutType}`)
      .first();
  });

  const versionsForThisHandoutType = useLiveQuery(() => {
    return db.versions
      .where("handoutType")
      .equals(appState.selectedHandoutType)
      .reverse()
      .sortBy("timestamp");
  });

  if (!currentHandoutTransientRow) {
    console.log("no current handout transient row");
    return <div>Loading...</div>;
  }

  return (
    <StateContext.Provider
      value={{
        highlighted,
        setHighlighted,
        onChange: () => {
          console.log("context data changed");
        },
      }}
    >
      <Helmet>
        <style>
          {`
          @keyframes blink { 
            50% { outline-style: dotted; } 
          }
#${highlighted} {
    outline: 5px dashed #00FF00;
    outline-offset: 1em;
    animation: blink .5s step-end infinite alternate;
}
`}
        </style>
      </Helmet>
      <div className="flex min-h-full flex-col md:flex-row">
        <div className="left-column bg-gray-300 overflow-y-scroll h-screen p-4 md:w-1/4 md:min-w-[400px]">
          <h1 className="text-xl font-poppins font-bold mb-4 md:min-w-[400px]">
            📜 Tom G's RPG Handout Builder
          </h1>

          <HandoutTypeSelector />

          {/* <VersionSelector
            versionsList={versionManager.versionsList}
            selectedVersionId={versionManager.selectedVersionId}
            isLoading={versionManager.isLoading}
            error={versionManager.error}
            onSave={versionManager.handleSave}
            onVersionSelect={versionManager.handleVersionSelect}
            onDeleteVersion={versionManager.handleDeleteVersion}
            onRenameVersion={versionManager.handleRenameVersion}
          /> */}

          <div className="p-4 bg-red-100 mb-4">
            <button
              onClick={() => {
                saveVersion(
                  appState.selectedHandoutType,
                  currentHandoutTransientRow.data
                );
              }}
              className="bg-white"
            >
              save version
            </button>

            <select
              onChange={(e) => updateTransientRecordToVersion(e.target.value)}
              // onChange={(e) => {}}
              value={appState.selectedVersionId}
            >
              {(versionsForThisHandoutType || []).map((version) => (
                <option value={version.id} key={version.id}>
                  {version.createdAt.toLocaleDateString()} at{" "}
                  {version.createdAt.toLocaleTimeString()}
                </option>
              ))}
            </select>
          </div>

          <FormRenderer
            data={currentHandoutTransientRow.data}
            formConfig={formConfig}
            onChange={(path: string, value: any) => {
              // when the user changes ANY form input...
              // ...update the data in app state
              const newData = _.cloneDeep(currentHandoutTransientRow.data);
              _.set(newData, path, value);

              // ...and then update the transient record in the db for this handout type
              const newDataPlain = JSON.parse(JSON.stringify(newData));
              db.handouts
                .where("id")
                .equals(`TRANSIENT_${appState.selectedHandoutType}`)
                .modify({
                  data: newDataPlain,
                });
            }}
          />
        </div>

        <div className="right-column render-area md:w-3/4 relative w-full h-screen z-10 overflow-y-scroll bg-[#2f3640] pt-[5%] pb-[10%]">
          <div
            className="render-area-content w-full flex flex-col justify-around items-center origin-center"
            style={{
              transform: `rotate(${
                currentHandoutTransientRow.data.positioning?.rotationDegrees ||
                0
              }deg) scale(${
                currentHandoutTransientRow.data.positioning?.zoom || 1
              })`,
              transition: "transform 0.3s ease-out",
            }}
          >
            {appState.selectedHandoutType === "Newspaper" && (
              <Newspaper handout={currentHandoutTransientRow.data} />
            )}
          </div>
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { StateContext } from "./context";
import { useHandoutState } from "./hooks/useHandoutState";
import { useVersionManager } from "./hooks/useVersionManager";
import { HandoutForm } from "./components/HandoutForm";
import { RenderArea } from "./components/RenderArea";
import {
  AllConfigNames,
  allConfigs,
  extractConfigAsData,
  extractConfigAsFormConfig,
} from "./db";
import { ConfigFormRenderer } from "./ConfigFormRenderer";
import { FormRenderer } from "./FormRenderer";
import * as _ from "lodash";
import { snapshot, useSnapshot } from "valtio";
import { appState as appStateProxy, db } from "./db";
import { HandoutTypeSelector } from "./HandoutTypeSelector";
import { useLiveQuery } from "dexie-react-hooks";

function App() {
  const appState = useSnapshot(appStateProxy);

  const [highlighted, setHighlighted] = useState("");

  const selectedConfig = allConfigs.find(
    (config) => config.name === appState.selectedHandoutType
  )!;

  const formConfig = extractConfigAsFormConfig(selectedConfig.config);

  // console.log("appState.selectedHandoutType", appState.selectedHandoutType);
  const currentHandoutTransientRow = useLiveQuery(() => {
    return db.handouts
      .where("id")
      .equals(`TRANSIENT_${appState.selectedHandoutType}`)
      .first();
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
      <div className="flex min-h-full flex-col md:flex-row">
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

        <div className="left-column bg-gray-300 overflow-y-scroll h-screen p-4">
          <h1 className="text-xl font-poppins font-bold mb-4 md:min-w-[400px]">
            📜 Tom G's RPG Handout Builder
          </h1>

          <HandoutTypeSelector />

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
              console.log("newDataPlain", newDataPlain);
              db.handouts
                .where("id")
                .equals(`TRANSIENT_${appState.selectedHandoutType}`)
                .modify({
                  data: newDataPlain,
                });
            }}
          />
        </div>

        <div className="render-area"></div>

        {/* <HandoutForm
          currentHandoutDefinitionKey={currentHandoutDefinitionKey}
          currentHandoutConfig={currentHandoutConfig}
          currentHandoutData={currentHandoutData}
          versionsList={versionsList}
          selectedVersion={selectedVersion}
          onHandoutTypeChange={changeHandoutType}
          onSave={handleSave}
          onVersionSelect={handleVersionSelect}
        /> */}

        {/* <RenderArea
          handoutType={currentHandoutDefinitionKey}
          handoutData={currentHandoutData}
        /> */}
      </div>
    </StateContext.Provider>
  );
}

export default App;

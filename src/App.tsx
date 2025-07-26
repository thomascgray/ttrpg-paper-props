import { useState } from "react"; //
import { Helmet } from "react-helmet-async";
import { FormRenderer } from "./FormRenderer";
import * as _ from "lodash";
import { snapshot, useSnapshot } from "valtio";

import { HandoutTypeSelector } from "./HandoutTypeSelector";
import { VersionSelector } from "./components/VersionSelector";
import { useLiveQuery } from "dexie-react-hooks";
import { Newspaper } from "./renderer/Newspaper";
import { NewspaperClipping } from "./renderer/NewspaperClipping";
import { CharacterCard } from "./renderer/CharacterCard";
import { PlainLetter } from "./renderer/PlainLetter";
import { BookCover } from "./renderer/BookCover";
import { LabelledLiquid } from "./renderer/LabelledLiquid";
import { HangingWoodenSign } from "./renderer/HangingWoodenSign";
import { ThreePanelDirectionalSign } from "./renderer/ThreePanelDirectionalSign";
import { CrtScreen } from "./renderer/CrtScreen";
import { appState as appStateProxy } from "./appState";
import { allConfigs } from "./handoutConfigs";
import { extractConfigAsFormConfig } from "./configUtils";
import { db, saveVersion, updateTransientRecordToVersion } from "./database";
import { PaperMap } from "./renderer/PaperMap";
import { SciFiHologram } from "./renderer/SciFiHologram";

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
  }, [appState.selectedHandoutType]);

  const versionsForThisHandoutType = useLiveQuery(() => {
    return db.versions
      .where("handoutType")
      .equals(`${appState.selectedHandoutType}`)
      .reverse()
      .sortBy("timestamp");
  }, [appState.selectedHandoutType]);

  if (!currentHandoutTransientRow) {
    console.log("no current handout transient row");
    return <div>Loading...</div>;
  }

  return (
    <>
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

          <p className="my-4 text-xs text-gray-700">
            Made by{" "}
            <a
              target="_blank"
              className="text-blue-500 underline"
              href="https://tomg.cool/"
            >
              Tom
            </a>
            <br />
            This tool is in early and active development. Sorry if it explodes!
            <br />
            Bugs? Feature requests? Please message me on Bluesky{" "}
            <a
              target="_blank"
              className="text-blue-500 underline"
              href="https://bsky.app/profile/tombola.bsky.social"
            >
              bsky.app/profile/tombola.bsky.social
            </a>
          </p>

          <HandoutTypeSelector />

          <div className="p-5 bg-gray-400 mb-4 -ml-4 -mr-4">
            <div className="flex items-center justify-between">
              <button
                className="bg-red-500 border-red-600 border-solid border-2 text-white py-2 px-3 font-bold text-sm rounded-sm hover:scale-105 transition-transform"
                title="Save the current configuration of the handout so that it can be reloaded later"
                onClick={() => {
                  saveVersion(
                    appState.selectedHandoutType,
                    currentHandoutTransientRow.data
                  );
                }}
              >
                Save Snapshot
              </button>

              <select
                className="text-sm"
                onChange={(e) => updateTransientRecordToVersion(e.target.value)}
                value={appState.selectedVersionId}
              >
                {(versionsForThisHandoutType || []).map((version) => (
                  <option value={version.id} key={version.id}>
                    {version.createdAt.toLocaleDateString()} at{" "}
                    {version.createdAt.toLocaleTimeString()}
                  </option>
                ))}
                <option value="TRANSIENT">Unsaved snapshot</option>
              </select>
            </div>
            <p className="text-sm italic mt-3">
              Snapshots are saved locally to your machine - no data is sent to
              any server.
            </p>
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
              appStateProxy.selectedVersionId = "TRANSIENT";
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
            {currentHandoutTransientRow.type === "Newspaper" &&
              appState.selectedHandoutType === "Newspaper" && (
                <Newspaper handout={currentHandoutTransientRow.data} />
              )}
            {currentHandoutTransientRow.type === "NewspaperClipping" &&
              appState.selectedHandoutType === "NewspaperClipping" && (
                <NewspaperClipping handout={currentHandoutTransientRow.data} />
              )}
            {currentHandoutTransientRow.type === "CharacterCard" &&
              appState.selectedHandoutType === "CharacterCard" && (
                <CharacterCard handout={currentHandoutTransientRow.data} />
              )}
            {currentHandoutTransientRow.type === "PlainLetter" &&
              appState.selectedHandoutType === "PlainLetter" && (
                <PlainLetter handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "BookCover" &&
              appState.selectedHandoutType === "BookCover" && (
                <BookCover handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "LabelledLiquid" &&
              appState.selectedHandoutType === "LabelledLiquid" && (
                <LabelledLiquid handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "HangingWoodenSign" &&
              appState.selectedHandoutType === "HangingWoodenSign" && (
                <HangingWoodenSign handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "ThreePanelDirectionalSign" &&
              appState.selectedHandoutType === "ThreePanelDirectionalSign" && (
                <ThreePanelDirectionalSign
                  handout={currentHandoutTransientRow.data}
                />
              )}

            {currentHandoutTransientRow.type === "CrtScreen" &&
              appState.selectedHandoutType === "CrtScreen" && (
                <CrtScreen handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "PaperMap" &&
              appState.selectedHandoutType === "PaperMap" && (
                <PaperMap handout={currentHandoutTransientRow.data} />
              )}

            {currentHandoutTransientRow.type === "SciFiHologram" &&
              appState.selectedHandoutType === "SciFiHologram" && (
                <SciFiHologram data={currentHandoutTransientRow.data} />
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

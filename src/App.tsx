import React, { useState, useEffect } from "react";

import { ConfigFormRenderer } from "./ConfigFormRenderer";
import * as _ from "lodash";
import { Helmet } from "react-helmet";
import { StateContext } from "./context";

import {
  ALL_HANDOUT_DEFINITIONS,
  BOOK_COVER,
  CHARACTER_CARD,
  eHandoutDefinitions,
  iHandoutDefinition,
  NEWSPAPER,
  PLAIN_LETTER,
} from "./config2";
import { Newspaper } from "./renderer/Newspaper";
import { CharacterCard } from "./renderer/CharacterCard";
import { PlainLetter } from "./renderer/PlainLetter";
import { BookCover } from "./renderer/BookCover";
import { formatTimestampToText } from "./utils";

const localStorageKey = "tomg_rpg_handout_builder";

function App() {
  const [currentHandoutDefinitionKey, setCurrentHandoutDefinitionKey] =
    useState<eHandoutDefinitions>(eHandoutDefinitions.PLAIN_LETTER);

  const currentHandoutConfig =
    ALL_HANDOUT_DEFINITIONS[currentHandoutDefinitionKey];

  const savedDataString = window.localStorage.getItem(
    `${localStorageKey}_${currentHandoutDefinitionKey}`
  );

  const savedData = savedDataString ? JSON.parse(savedDataString) : {};

  const [currentHandoutData, setCurrentHandoutData] = useState<
    iHandoutDefinition["data"]
  >({
    ...currentHandoutConfig.data, // so this is the base data
    ...savedData, // then we're overwriting it with any saved data
  });

  let existingVersionsRaw = window.localStorage.getItem(
    `${localStorageKey}_versions_${currentHandoutDefinitionKey}`
  );
  if (existingVersionsRaw === null) {
    existingVersionsRaw = "[]";
  }
  const [versionsList, setVersionsList] = useState([
    ...JSON.parse(existingVersionsRaw),
  ]);

  const [selectedVersion, setSelectedVersion] = useState(
    versionsList[0]?.timestamp.toString() || null
  );

  useEffect(() => {
    //whenever we update the version list, set the selected version to the first from the version list
    if (versionsList.length >= 1) {
      setSelectedVersion(versionsList[0].timestamp.toString());
    }
  }, [versionsList]);

  const handleDataChange = (
    name: string,
    value: any | null,
    shouldSpread: boolean = false
  ) => {
    let newHandoutData = {
      ...currentHandoutConfig.data, // so this is the base data
      ...currentHandoutData, // this is the current data
    };

    // if value is NULL, we need to delete the key
    if (value === null) {
      const [key, index] = name.split("::");
      // @ts-ignore if value is null then newHandoutData[key] is an array
      newHandoutData[key].splice(index, 1);
    } else if (shouldSpread) {
      _.set(newHandoutData, name, {
        ..._.get(newHandoutData, name),
        ...value,
      });
    } else {
      _.set(newHandoutData, name, {
        ..._.get(newHandoutData, name),
        value,
      });
    }

    setCurrentHandoutData(newHandoutData as any);
    window.localStorage.setItem(
      `${localStorageKey}_${currentHandoutDefinitionKey}`,
      JSON.stringify(newHandoutData)
    );
  };

  const refreshData = (key: eHandoutDefinitions) => {
    const config = ALL_HANDOUT_DEFINITIONS[key];
    const savedDataString = window.localStorage.getItem(
      `${localStorageKey}_${key}`
    );
    const savedData = savedDataString ? JSON.parse(savedDataString) : {};
    setCurrentHandoutData({
      ...config.data,
      ...savedData,
    });

    let existingVersionsRaw = window.localStorage.getItem(
      `${localStorageKey}_versions_${key}`
    );
    if (existingVersionsRaw === null) {
      existingVersionsRaw = "[]";
    }
    const existingVersions = JSON.parse(existingVersionsRaw);

    setVersionsList(existingVersions);
  };

  const handleSave = () => {
    // get the current list out of the app
    let existingVersionsRaw = window.localStorage.getItem(
      `${localStorageKey}_versions_${currentHandoutDefinitionKey}`
    );
    if (existingVersionsRaw === null) {
      existingVersionsRaw = "[]";
    }
    const versions = JSON.parse(existingVersionsRaw);

    // add the current data to it
    versions.unshift({
      ...currentHandoutData,
      timestamp: Date.now(),
    });

    // resave that list into both local state and app state
    setVersionsList(versions);
    window.localStorage.setItem(
      `${localStorageKey}_versions_${currentHandoutDefinitionKey}`,
      JSON.stringify(versions)
    );
  };

  const handleVersionSelect = (selectedTimeStamp: string) => {
    const selectedVersion = versionsList.find(
      (v) => v.timestamp.toString() === selectedTimeStamp.toString()
    );

    setSelectedVersion(selectedTimeStamp);
    setCurrentHandoutData({
      ...selectedVersion,
      timestamp: undefined,
    });
  };

  const [highlighted, setHighlighted] = useState("");

  const rotationValue: number | undefined =
    // @ts-ignore
    currentHandoutData.positioning.rotation_degrees.value;

  const zoomValue: number | undefined =
    // @ts-ignore
    currentHandoutData.positioning.zoom.value;

  return (
    <StateContext.Provider
      value={{
        highlighted,
        setHighlighted,
        onChange: handleDataChange,
      }}
    >
      <div className="flex min-h-full">
        {/* form */}
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
        <div
          style={{
            height: "100vh",
            minWidth: "400px",
          }}
          className="form w-1/3 max-w-md bg-gray-300 z-20 overflow-y-scroll pb-20"
        >
          <div className="bg-gray-300 p-4">
            <h1 className="text-xl font-poppins font-bold mb-4">
              📜 Tom G's RPG Handout Builder
            </h1>

            <label className="block mb-4">
              <span className="block mb-1">Prop Type</span>
              <select
                value={currentHandoutDefinitionKey}
                className="p-2 text-lg w-full"
                onChange={(e) => {
                  setCurrentHandoutDefinitionKey(
                    e.target.value as eHandoutDefinitions
                  );
                  refreshData(e.target.value as eHandoutDefinitions);
                }}
              >
                <optgroup label="'Pseudo' Paper / Print">
                  {Object.keys(ALL_HANDOUT_DEFINITIONS).map((typeKey) => {
                    const p =
                      ALL_HANDOUT_DEFINITIONS[typeKey as eHandoutDefinitions];
                    return (
                      <option key={typeKey} value={typeKey}>
                        {p.name}
                      </option>
                    );
                  })}
                </optgroup>
              </select>
            </label>

            <span className="text-sm">{currentHandoutConfig.caption}</span>
          </div>

          <div className="bg-gray-400 p-4 flex flex-col space-y-2">
            <div className="flex items-center">
              <button
                onClick={handleSave}
                className="bg-red-500 rounded shadow mr-4 px-4 py-2 text-white text-sm font-bold hover:scale-100 active:scale-90"
              >
                Save Snapshot
              </button>
              {versionsList.length <= 0 && (
                <span className="italic">No copies saved yet</span>
              )}
              {selectedVersion && versionsList.length >= 1 && (
                <select
                  value={selectedVersion}
                  onChange={(e) => handleVersionSelect(e.target.value)}
                  className="grow rounded shadow px-4 py-2"
                >
                  {versionsList.map((v) => {
                    return (
                      <option
                        label={formatTimestampToText(v.timestamp)}
                        key={v.timestamp}
                      >
                        {v.timestamp}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <span className="text-xs italic">
              Copies are saved locally to your machine - no data is sent to any
              server.
            </span>
          </div>

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

        {/* render area */}
        <div className="render-area-wrapper relative w-full h-screen z-10 overflow-y-scroll bg-[#2f3640] pt-[5%] pb-[10%]">
          <div
            className="render-area-content w-full flex flex-col justify-around items-center origin-center"
            style={{
              transform: `rotate(${rotationValue || 0}deg) scale(${
                zoomValue || 1
              })`,
            }}
          >
            {currentHandoutDefinitionKey === eHandoutDefinitions.NEWSPAPER && (
              <Newspaper
                handout={
                  currentHandoutData as unknown as (typeof NEWSPAPER)["data"]
                }
              />
            )}
            {currentHandoutDefinitionKey ===
              eHandoutDefinitions.CHARACTER_CARD && (
              <CharacterCard
                handout={
                  currentHandoutData as unknown as (typeof CHARACTER_CARD)["data"]
                }
              />
            )}
            {currentHandoutDefinitionKey ===
              eHandoutDefinitions.PLAIN_LETTER && (
              <PlainLetter
                handout={
                  currentHandoutData as unknown as (typeof PLAIN_LETTER)["data"]
                }
              />
            )}
            {currentHandoutDefinitionKey === eHandoutDefinitions.BOOK_COVER && (
              <BookCover
                handout={
                  currentHandoutData as unknown as (typeof BOOK_COVER)["data"]
                }
              />
            )}
          </div>
          {/* help text */}

          {/* <button className="absolute top-0 left-0 stroke-black bg-white rounded-full">
            <svg
              className="w-10 h-10"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> */}
        </div>
      </div>
    </StateContext.Provider>
  );
}

export default App;

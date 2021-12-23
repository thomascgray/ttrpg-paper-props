import React, { useState, useEffect } from "react";

import { Newspaper } from "./props/Newspaper/renderer";
import { WantedPoster } from "./props/WantedPoster/renderer";
import { NewspaperClipping } from "./props/NewspaperClipping/renderer";
import { HandwrittenLetter } from "./props/HandwrittenLetter/renderer";
import { Ticket } from "./props/Ticket/renderer";
import { BlankPages } from "./props/BlankPages/renderer";
import { BookCover } from "./props/BookCover/renderer";
import { NPCCard } from "./props/NPCCard/renderer";

import { NewspaperForm } from "./props/Newspaper/form";
import { WantedPosterForm } from "./props/WantedPoster/form";
import { NewspaperClippingForm } from "./props/NewspaperClipping/form";
import { HandwrittenLetterForm } from "./props/HandwrittenLetter/form";
import { TicketForm } from "./props/Ticket/form";
import { BookCoverForm } from "./props/BookCover/form";
import { NPCCardForm } from "./props/NPCCard/form";

import { PAPER_TYPES } from "./config";
import { RotateAndZoomControls } from "./components/RotateAndZoomControls";

function App() {
  const [selectedPaperType, setSelectedPaperType] =
    useState<keyof typeof PAPER_TYPES>("NEWSPAPER");

  const paperType = PAPER_TYPES[selectedPaperType];

  const savedDataString = window.localStorage.getItem(
    `paper_data_${selectedPaperType}`
  );
  const savedData = savedDataString ? JSON.parse(savedDataString) : {};

  const [paperData, setPaperData] = useState({
    ...paperType.data,
    ...savedData,
  });

  let existingVersionsRaw = window.localStorage.getItem(
    `paper_data_versions_${selectedPaperType}`
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

  const handleDataChange = (name: string, value: any) => {
    const newPaperData = {
      ...paperType.data,
      ...paperData,
      [name]: value,
    };
    setPaperData(newPaperData);
    window.localStorage.setItem(
      `paper_data_${selectedPaperType}`,
      JSON.stringify(newPaperData)
    );
  };

  const refreshData = (key: keyof typeof PAPER_TYPES) => {
    const paperType = PAPER_TYPES[key];
    const savedDataString = window.localStorage.getItem(`paper_data_${key}`);
    const savedData = savedDataString ? JSON.parse(savedDataString) : {};
    setPaperData({
      ...paperType.data,
      ...savedData,
    });

    let existingVersionsRaw = window.localStorage.getItem(
      `paper_data_versions_${key}`
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
      `paper_data_versions_${selectedPaperType}`
    );
    if (existingVersionsRaw === null) {
      existingVersionsRaw = "[]";
    }
    const versions = JSON.parse(existingVersionsRaw);

    // add the current data to it
    versions.unshift({
      ...paperData,
      timestamp: Date.now(),
    });

    // resave that list into both local state and app state
    setVersionsList(versions);
    window.localStorage.setItem(
      `paper_data_versions_${selectedPaperType}`,
      JSON.stringify(versions)
    );
  };

  const handleVersionSelect = (selectedTimeStamp: string) => {
    const selectedVersion = versionsList.find(
      (v) => v.timestamp.toString() === selectedTimeStamp.toString()
    );

    setSelectedVersion(selectedTimeStamp);
    setPaperData({
      ...selectedVersion,
      timestamp: undefined,
    });
  };

  return (
    <div className="flex min-h-full">
      {/* form */}
      <div
        style={{
          height: "100vh",
          minWidth: "400px",
        }}
        className="form w-1/3 max-w-md bg-gray-300 z-20 overflow-y-scroll pb-20"
      >
        <div className="bg-gray-400 p-4">
          <label className="block mb-4">
            <span className="block mb-1">Prop Type</span>
            <select
              value={selectedPaperType}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                setSelectedPaperType(
                  e.target.value as keyof typeof PAPER_TYPES
                );
                refreshData(e.target.value as keyof typeof PAPER_TYPES);
              }}
            >
              {Object.keys(PAPER_TYPES).map((typeKey) => {
                const p = PAPER_TYPES[typeKey as keyof typeof PAPER_TYPES];
                return (
                  <option key={typeKey} value={typeKey}>
                    {p.name}
                  </option>
                );
              })}
            </select>
          </label>

          <RotateAndZoomControls
            zoomValue={paperData.zoom}
            rotateValue={paperData.rotation_degrees}
            onZoomUpdate={(newZoom) => {
              handleDataChange("zoom", newZoom);
            }}
            onRotateUpdate={(newRotate) => {
              handleDataChange("rotation_degrees", newRotate);
            }}
          />
          {/* collections control */}
          <div className="flex mt-4">
            <button
              onClick={handleSave}
              className="bg-red-500 rounded shadow mr-4 px-4 py-2 text-white font-bold"
            >
              Save
            </button>
            {selectedVersion && versionsList.length >= 1 && (
              <select
                value={selectedVersion}
                onChange={(e) => handleVersionSelect(e.target.value)}
                className="grow rounded shadow px-4 py-2"
              >
                {versionsList.map((v) => {
                  return <option key={v.timestamp}>{v.timestamp}</option>;
                })}
              </select>
            )}
          </div>
        </div>

        <div className="bg-gray-300 p-4">
          {selectedPaperType === "NEWSPAPER" && (
            <NewspaperForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["NEWSPAPER"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          {selectedPaperType === "NEWSPAPER_CLIPPING" && (
            <NewspaperClippingForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          {selectedPaperType === "WANTED_POSTER" && (
            <WantedPosterForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["WANTED_POSTER"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          {selectedPaperType === "HANDWRITTEN_LETTER" && (
            <HandwrittenLetterForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          {selectedPaperType === "TICKET" && (
            <TicketForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["TICKET"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          {selectedPaperType === "BOOK_COVER" && (
            <BookCoverForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["BOOK_COVER"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}
          {selectedPaperType === "NPC_CARD" && (
            <NPCCardForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["NPC_CARD"]["data"]),
              }}
              handleDataChange={handleDataChange}
            />
          )}

          <span className="block mt-6">
            Made by{" "}
            <a
              className="text-blue-600 underline hover:text-blue-900"
              target="_blank"
              href="https://twitter.com/tmcgry"
            >
              Tom
            </a>
          </span>
        </div>
      </div>

      {/* render area */}
      <div
        style={{
          backgroundColor: "#2f3640",
          height: "100vh",
        }}
        className="render-area relative flex flex-col w-full z-10 overflow-y-scroll py-48"
      >
        <div className="absolute w-full text-center top-0 mt-4 italic text-gray-300 text-xs">
          <span className="font-bold">How to use:</span>
          <ol className="list-decimal">
            <li>
              Choose a "prop type" from the dropdown at the top left of the
              page.
            </li>
            <li>
              Use the controls on the left to change the information that gets
              rendered.
            </li>
            <li>
              Play around with Zoom, Rotate and prop widths until you get
              something you're happy with.
            </li>
            <li>Take a screenshot of the prop and put it wherever you like!</li>
            <li>
              To take a screenshot to clipboard on Windows: Win Key + Shift + S
            </li>
            <li>
              To take a screenshot to clipboard on Mac OS: Shift + Control +
              Command + 4
            </li>
          </ol>
        </div>

        {selectedPaperType === "NEWSPAPER" && (
          <Newspaper
            {...(paperData as typeof PAPER_TYPES["NEWSPAPER"]["data"])}
          />
        )}
        {selectedPaperType === "NEWSPAPER_CLIPPING" && (
          <NewspaperClipping
            {...(paperData as typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"])}
          />
        )}
        {selectedPaperType === "WANTED_POSTER" && (
          <WantedPoster
            {...(paperData as typeof PAPER_TYPES["WANTED_POSTER"]["data"])}
          />
        )}
        {selectedPaperType === "HANDWRITTEN_LETTER" && (
          <HandwrittenLetter
            {...(paperData as typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"])}
          />
        )}
        {selectedPaperType === "TICKET" && (
          <Ticket {...(paperData as typeof PAPER_TYPES["TICKET"]["data"])} />
        )}

        {selectedPaperType === "BOOK_COVER" && (
          <BookCover
            {...(paperData as typeof PAPER_TYPES["BOOK_COVER"]["data"])}
          />
        )}
        {selectedPaperType === "NPC_CARD" && (
          <NPCCard {...(paperData as typeof PAPER_TYPES["NPC_CARD"]["data"])} />
        )}
      </div>
    </div>
  );
}

export default App;

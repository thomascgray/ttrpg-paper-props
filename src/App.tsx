import React, { useState } from "react";
import { Newspaper } from "./props/Newspaper/renderer";
import { WantedPoster } from "./props/WantedPoster/renderer";
import { NewspaperClipping } from "./props/NewspaperClipping/renderer";
import { HandwrittenLetter } from "./props/HandwrittenLetter/renderer";
import { Ticket } from "./props/Ticket/renderer";
import { BlankPages } from "./props/BlankPages/renderer";
import { RaggedJournalCover } from "./props/RaggedJournalCover/renderer";
import { NPCCard } from "./props/NPCCard/renderer";

import { NewspaperForm } from "./props/Newspaper/form";
import { WantedPosterForm } from "./props/WantedPoster/form";
import { NewspaperClippingForm } from "./props/NewspaperClipping/form";
import { HandwrittenLetterForm } from "./props/HandwrittenLetter/form";
import { TicketForm } from "./props/Ticket/form";
import { RaggedJournalCoverForm } from "./props/RaggedJournalCover/form";
import { NPCCardForm } from "./props/NPCCard/form";

import { PAPER_TYPES } from "./config";
import { RotateAndZoomControls } from "./components/RotateAndZoomControls";

function App() {
  const [selectedPaperType, setSelectedPaperType] =
    useState<keyof typeof PAPER_TYPES>("NPC_CARD");

  const paperType = PAPER_TYPES[selectedPaperType];

  const [paperData, setPaperData] = useState({
    ...paperType.data,
  });

  const handleDataChange = (name: string, value: any) => {
    const newPaperData = {
      ...paperType.data,
      ...paperData,
      [name]: value,
    };
    setPaperData(newPaperData);
  };

  const refreshPaperData = (key: keyof typeof PAPER_TYPES) => {
    const paperType = PAPER_TYPES[key];
    setPaperData({
      ...paperType.data,
    });
  };

  return (
    <div className="flex min-h-full">
      <div
        style={{
          height: "100vh",
          minWidth: "400px",
        }}
        className="form w-1/3 max-w-md bg-gray-300 z-20 overflow-y-scroll pb-20"
      >
        <div className="bg-gray-400 p-4">
          <label className="block mb-4">
            <span className="block mb-1">Paper Type</span>
            <select
              value={selectedPaperType}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                setSelectedPaperType(
                  e.target.value as keyof typeof PAPER_TYPES
                );
                refreshPaperData(e.target.value as keyof typeof PAPER_TYPES);
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

          {selectedPaperType === "RAGGED_JOURNAL_COVER" && (
            <RaggedJournalCoverForm
              dataset={{
                ...(paperData as typeof PAPER_TYPES["RAGGED_JOURNAL_COVER"]["data"]),
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
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#2f3640",
          height: "100vh",
        }}
        className="render-area w-full z-10 overflow-y-scroll py-48"
      >
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

        {selectedPaperType === "BLANK_PAGES" && (
          <BlankPages
            {...(paperData as typeof PAPER_TYPES["BLANK_PAGES"]["data"])}
          />
        )}

        {selectedPaperType === "RAGGED_JOURNAL_COVER" && (
          <RaggedJournalCover
            {...(paperData as typeof PAPER_TYPES["RAGGED_JOURNAL_COVER"]["data"])}
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

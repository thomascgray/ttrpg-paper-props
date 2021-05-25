import React, { useState } from "react";
import { Newspaper } from "./renderers/Newspaper";
import { NewspaperForm } from "./forms/NewspaperForm";
import { WantedPoster } from "./renderers/WantedPoster";
import { PAPER_TYPES } from "./config";

function App() {
  const [selectedPaperType, setSelectedPaperType] =
    useState<keyof typeof PAPER_TYPES>("NEWSPAPER");

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
    <div className="flex h-full">
      <div className="form h-full w-1/3 bg-gray-300 p-4">
        <label className="block">
          <span className="block mb-1">Paper Type</span>
          <select
            value={selectedPaperType}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              setSelectedPaperType(e.target.value as keyof typeof PAPER_TYPES);
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

        <hr className="border-solid my-8 border-2 border-white" />

        {selectedPaperType === "NEWSPAPER" && (
          <NewspaperForm
            dataset={{
              ...(paperData as typeof PAPER_TYPES["NEWSPAPER"]["data"]),
            }}
            handleDataChange={(key, value) => {
              handleDataChange(key, value);
            }}
          />
        )}
      </div>

      <div className="render-area w-2/3 bg-gray-800">
        {selectedPaperType === "NEWSPAPER" && (
          <Newspaper
            {...(paperData as typeof PAPER_TYPES["NEWSPAPER"]["data"])}
          />
        )}
        {selectedPaperType === "WANTED_POSTER" && (
          <WantedPoster
            {...(paperData as typeof PAPER_TYPES["WANTED_POSTER"]["data"])}
          />
        )}
      </div>
    </div>
  );
}

export default App;

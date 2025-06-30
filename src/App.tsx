import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { StateContext } from "./context";
import { useHandoutState } from "./hooks/useHandoutState";
import { useVersionManager } from "./hooks/useVersionManager";
import { HandoutForm } from "./components/HandoutForm";
import { RenderArea } from "./components/RenderArea";

function App() {
  const {
    currentHandoutDefinitionKey,
    currentHandoutConfig,
    currentHandoutData,
    handleDataChange,
    changeHandoutType,
    updateHandoutData,
  } = useHandoutState();

  const {
    versionsList,
    selectedVersion,
    handleSave,
    handleVersionSelect,
  } = useVersionManager(currentHandoutDefinitionKey, currentHandoutData, updateHandoutData);

  const [highlighted, setHighlighted] = useState("");

  return (
    <StateContext.Provider
      value={{
        highlighted,
        setHighlighted,
        onChange: handleDataChange,
      }}
    >
      <div className="flex min-h-full">
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
        
        <HandoutForm
          currentHandoutDefinitionKey={currentHandoutDefinitionKey}
          currentHandoutConfig={currentHandoutConfig}
          currentHandoutData={currentHandoutData}
          versionsList={versionsList}
          selectedVersion={selectedVersion}
          onHandoutTypeChange={changeHandoutType}
          onSave={handleSave}
          onVersionSelect={handleVersionSelect}
        />

        <RenderArea
          handoutType={currentHandoutDefinitionKey}
          handoutData={currentHandoutData}
        />
      </div>
    </StateContext.Provider>
  );
}

export default App;

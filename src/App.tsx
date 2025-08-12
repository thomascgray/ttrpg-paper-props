import { useState, useEffect } from "react"; //
import { Helmet } from "react-helmet-async";
import { FormRenderer } from "./FormRenderer";
import * as _ from "lodash";
import { useSnapshot } from "valtio";
import { HandoutTypeSelector } from "./HandoutTypeSelector";
import { useLiveQuery } from "dexie-react-hooks";
import { Drawer } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
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
import {
  APP_VERSION,
  db,
  saveVersion,
  updateTransientRecordToVersion,
} from "./database";
import { PaperMap } from "./renderer/PaperMap";
import { SciFiHologram } from "./renderer/SciFiHologram";
import { Polaroid } from "./renderer/Polaroid";
import { CrystalBall } from "./renderer/CrystalBall";
import { Test } from "./renderer/Test";
import { BackgroundSelector } from "./BackgroundSelector";
import { getHandoutFromPath, updateUrlForHandout } from "./routes";
import { SignInFloatingButton } from "./SignInFloatingButton";
import { PositioningControls } from "./PositioningControls";

function App() {
  const appState = useSnapshot(appStateProxy);

  const [highlighted, setHighlighted] = useState("");
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Initialize from URL on mount
  useEffect(() => {
    const handoutFromUrl = getHandoutFromPath();
    if (handoutFromUrl && handoutFromUrl !== appState.selectedHandoutType) {
      appStateProxy.selectedHandoutType = handoutFromUrl;
      appStateProxy.selectedVersionId = "TRANSIENT";
    } else {
      // Update URL to match current selection if no route in URL
      updateUrlForHandout(appState.selectedHandoutType);
    }
  }, []);

  // Update URL when handout type changes
  useEffect(() => {
    updateUrlForHandout(appState.selectedHandoutType);
  }, [appState.selectedHandoutType]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const handoutFromUrl = getHandoutFromPath();
      if (handoutFromUrl && handoutFromUrl !== appState.selectedHandoutType) {
        appStateProxy.selectedHandoutType = handoutFromUrl;
        appStateProxy.selectedVersionId = "TRANSIENT";
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [appState.selectedHandoutType]);

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
        {/* Desktop Layout - Left Column */}
        <div className="hidden md:block left-column bg-gray-300 overflow-y-scroll h-screen p-4 md:w-1/4 md:min-w-[500px]">
          <h1 className="text-2xl font-poppins font-bold mb-4 md:min-w-[400px]">
            📜 Tombola's RPG Handout Builder
          </h1>

          <p className="text-xs text-gray-700 italic my-4">
            This tool is in early and active development. I'm often releasing
            improvements, but that means unfortunately its common for things to
            explode, snapshots to be lost, etc. Sorry about that!
          </p>

          <details className="text-xs text-gray-700 mb-4">
            <summary className="text-xs text-gray-700 cursor-pointer">
              What is this tool? What am I looking at?
            </summary>
            <br />
            <p className="font-bold text-sm">
              Welcome to Tombola's RPG Handout Builder!
            </p>
            <p>
              This tool is designed to help you create handouts for roleplaying
              games.
            </p>
            <br />
            <ul className="list-decimal list-inside">
              <li>Select different handout types from the dropdown below</li>
              <li>Then use the form below to change options</li>
              <li>The handouts render on the right in real-time</li>
              <li>
                If you want to hold onto a particular configuration, save it
                with the "Save Snapshot"
              </li>
              <li>To share the handouts, simply take a screenshot</li>
              <ul className="list-disc list-inside ml-2">
                <li>On Windows: Windows + Shift + S</li>
                <li>On Mac: Command + Shift + 4</li>
                <li>On Linux: Shift + Print Screen (probably)</li>
              </ul>
              <li>
                Paste the image into your group chat, reddit post, email, etc.
              </li>
              <li>Bask in the praise of your playing group</li>
            </ul>
            <p className="mt-2 text-xs text-gray-700">
              Made by{" "}
              <a
                target="_blank"
                className="text-blue-500 underline"
                href="https://tomg.cool/"
              >
                me, Tom
              </a>
              <br />
              <br />
              APP VERSION v0.{APP_VERSION}
              <br />
              <br />
              Bugs? Feature requests? Love it? Hate it?{" "}
              <a
                target="_blank"
                className="text-blue-500 underline"
                href="https://bsky.app/profile/tombola.bsky.social"
              >
                Tell me on Bluesky!
              </a>
            </p>
          </details>

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

        {/* Mobile Drawer */}
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="bottom"
          size="80%"
          styles={{
            body: { padding: 0 },
            header: { padding: "1rem" },
            close: { marginRight: "0.5rem" },
          }}
          className="md:hidden"
        >
          <div className="bg-gray-300 p-4 h-full overflow-y-auto">
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
                  onChange={(e) =>
                    updateTransientRecordToVersion(e.target.value)
                  }
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
        </Drawer>

        {/* Mobile Drawer Toggle Button */}
        {isMobile && !drawerOpened && (
          <button
            onClick={openDrawer}
            className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-6 py-3 rounded-t-lg shadow-lg hover:bg-gray-600 transition-colors z-50 md:hidden flex items-center gap-2"
            aria-label="Open settings drawer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            <span>Settings</span>
          </button>
        )}

        <div
          className="right-column relative render-area md:w-3/4 w-full h-screen z-10 overflow-y-scroll flex flex-col justify-around"
          style={{
            ...(appState.backgroundType === "color"
              ? { backgroundColor: appState.backgroundColor }
              : appState.backgroundType === "gradient"
              ? {
                  background:
                    appState.backgroundGradientType === "linear"
                      ? `linear-gradient(${appState.backgroundGradientAngle}deg, ${appState.backgroundGradientStart}, ${appState.backgroundGradientEnd})`
                      : appState.backgroundGradientType === "radial"
                      ? `radial-gradient(circle at ${appState.backgroundGradientPosition}, ${appState.backgroundGradientStart}, ${appState.backgroundGradientEnd})`
                      : `conic-gradient(from ${appState.backgroundGradientAngle}deg, ${appState.backgroundGradientStart}, ${appState.backgroundGradientEnd})`,
                }
              : appState.backgroundType === "custom" &&
                appState.backgroundCustomImage
              ? {
                  backgroundImage: `url(${appState.backgroundCustomImage})`,
                  backgroundSize: `${appState.backgroundImageZoom * 100}% auto`,
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  filter: appState.backgroundImageBlur ? "blur(5px)" : "none",
                }
              : { backgroundColor: "#2f3640" }),
          }}
        >
          <div className="relative z-10">
            <div
              className="render-area-content w-full flex flex-col justify-around items-center origin-center"
              style={{
                transform: `rotate(${
                  currentHandoutTransientRow.data.positioning
                    ?.rotationDegrees || 0
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
                  <NewspaperClipping
                    handout={currentHandoutTransientRow.data}
                  />
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
                  <HangingWoodenSign
                    handout={currentHandoutTransientRow.data}
                  />
                )}

              {currentHandoutTransientRow.type ===
                "ThreePanelDirectionalSign" &&
                appState.selectedHandoutType ===
                  "ThreePanelDirectionalSign" && (
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

              {currentHandoutTransientRow.type === "Polaroid" &&
                appState.selectedHandoutType === "Polaroid" && (
                  <Polaroid handout={currentHandoutTransientRow.data} />
                )}
              {currentHandoutTransientRow.type === "CrystalBall" &&
                appState.selectedHandoutType === "CrystalBall" && (
                  <CrystalBall handout={currentHandoutTransientRow.data} />
                )}
              {currentHandoutTransientRow.type === "Test" &&
                appState.selectedHandoutType === "Test" && (
                  <Test data={currentHandoutTransientRow.data} />
                )}
            </div>
          </div>
          <BackgroundSelector />
          <SignInFloatingButton />
          <PositioningControls />
        </div>
      </div>
    </>
  );
}

export default App;

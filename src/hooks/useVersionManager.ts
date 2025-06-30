import { useState, useEffect, useCallback } from "react";
import { eHandoutDefinitions, iHandoutDefinition } from "../config";
import { useLocalStorage } from "./useLocalStorage";
import { stripTimestampFromVersion } from "../utils/dataTransforms";

export const useVersionManager = (
  currentHandoutDefinitionKey: eHandoutDefinitions,
  currentHandoutData: iHandoutDefinition["data"],
  updateHandoutData: (data: iHandoutDefinition["data"]) => void
) => {
  const localStorage = useLocalStorage();

  const [versionsList, setVersionsList] = useState<any[]>(() => {
    return localStorage.getVersions(currentHandoutDefinitionKey);
  });

  const [selectedVersion, setSelectedVersion] = useState<string | null>(
    () => versionsList[0]?.timestamp.toString() || null
  );

  // Update versions list when handout type changes
  useEffect(() => {
    const versions = localStorage.getVersions(currentHandoutDefinitionKey);
    setVersionsList(versions);
    // set the selected version to the most recent version
    // setSelectedVersion(versions[0]?.timestamp.toString() || null);
  }, [currentHandoutDefinitionKey]);

  // Auto-select first version when list changes
  useEffect(() => {
    if (versionsList.length >= 1) {
      setSelectedVersion(versionsList[0].timestamp.toString());
    }
  }, [versionsList]);

  const handleSave = useCallback(() => {
    const updatedVersions = localStorage.addVersion(
      currentHandoutDefinitionKey,
      currentHandoutData
    );
    setVersionsList(updatedVersions);
    // set the selected version to the latest version
    setSelectedVersion(updatedVersions[0].timestamp.toString());
  }, [localStorage, currentHandoutDefinitionKey, currentHandoutData]);

  const handleVersionSelect = useCallback(
    (selectedTimeStamp: string) => {
      const version = versionsList.find(
        (v) => v.timestamp.toString() === selectedTimeStamp.toString()
      );

      if (version) {
        setSelectedVersion(selectedTimeStamp);
        const dataWithoutTimestamp = stripTimestampFromVersion(version);
        updateHandoutData(dataWithoutTimestamp);
      }
    },
    [versionsList, updateHandoutData]
  );

  return {
    versionsList,
    selectedVersion,
    handleSave,
    handleVersionSelect,
  };
};

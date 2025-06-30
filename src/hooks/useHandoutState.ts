import { useState, useCallback } from 'react';
import { ALL_HANDOUT_DEFINITIONS, eHandoutDefinitions, iHandoutDefinition } from '../config';
import { useLocalStorage } from './useLocalStorage';
import { transformHandoutData, mergeHandoutData } from '../utils/dataTransforms';

export const useHandoutState = () => {
  const localStorage = useLocalStorage();
  
  const [currentHandoutDefinitionKey, setCurrentHandoutDefinitionKey] = 
    useState<eHandoutDefinitions>(eHandoutDefinitions.NEWSPAPER);

  const currentHandoutConfig = ALL_HANDOUT_DEFINITIONS[currentHandoutDefinitionKey];

  const initializeHandoutData = useCallback((handoutType: eHandoutDefinitions) => {
    const config = ALL_HANDOUT_DEFINITIONS[handoutType];
    const savedData = localStorage.getHandoutData(handoutType);
    return mergeHandoutData(config.data, savedData);
  }, [localStorage]);

  const [currentHandoutData, setCurrentHandoutData] = useState<any>(
    () => initializeHandoutData(currentHandoutDefinitionKey)
  );

  const handleDataChange = useCallback((
    name: string,
    value: any | null,
    shouldSpread: boolean = false
  ) => {
    const newHandoutData = transformHandoutData(
      currentHandoutConfig.data,
      currentHandoutData,
      name,
      value,
      shouldSpread
    );

    setCurrentHandoutData(newHandoutData);
    localStorage.setHandoutData(currentHandoutDefinitionKey, newHandoutData);
  }, [currentHandoutConfig.data, currentHandoutData, currentHandoutDefinitionKey, localStorage]);

  const refreshData = useCallback((key: eHandoutDefinitions) => {
    const newData = initializeHandoutData(key);
    setCurrentHandoutData(newData);
  }, [initializeHandoutData]);

  const changeHandoutType = useCallback((newType: eHandoutDefinitions) => {
    setCurrentHandoutDefinitionKey(newType);
    refreshData(newType);
  }, [refreshData]);

  const updateHandoutData = useCallback((newData: any) => {
    setCurrentHandoutData(newData);
  }, []);

  return {
    currentHandoutDefinitionKey,
    currentHandoutConfig,
    currentHandoutData,
    handleDataChange,
    refreshData,
    changeHandoutType,
    updateHandoutData,
  };
};
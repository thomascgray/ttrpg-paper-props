import { useCallback } from 'react';
import { eHandoutDefinitions } from '../config';

const VERSION = "0.3";
const DEBUG = false;

const localStorageKey = `${VERSION}_tomg_rpg_handout_builder`;

if (DEBUG) {
  window.localStorage.clear();
}

export const useLocalStorage = () => {
  const getHandoutDataKey = useCallback((handoutType: eHandoutDefinitions) => {
    return `${localStorageKey}_${handoutType}`;
  }, []);

  const getVersionsKey = useCallback((handoutType: eHandoutDefinitions) => {
    return `${localStorageKey}_versions_${handoutType}`;
  }, []);

  const getHandoutData = useCallback((handoutType: eHandoutDefinitions) => {
    const savedDataString = window.localStorage.getItem(getHandoutDataKey(handoutType));
    return savedDataString ? JSON.parse(savedDataString) : {};
  }, [getHandoutDataKey]);

  const setHandoutData = useCallback((handoutType: eHandoutDefinitions, data: any) => {
    window.localStorage.setItem(getHandoutDataKey(handoutType), JSON.stringify(data));
  }, [getHandoutDataKey]);

  const getVersions = useCallback((handoutType: eHandoutDefinitions) => {
    const existingVersionsRaw = window.localStorage.getItem(getVersionsKey(handoutType));
    return existingVersionsRaw ? JSON.parse(existingVersionsRaw) : [];
  }, [getVersionsKey]);

  const setVersions = useCallback((handoutType: eHandoutDefinitions, versions: any[]) => {
    window.localStorage.setItem(getVersionsKey(handoutType), JSON.stringify(versions));
  }, [getVersionsKey]);

  const addVersion = useCallback((handoutType: eHandoutDefinitions, data: any) => {
    const versions = getVersions(handoutType);
    const newVersion = {
      ...data,
      timestamp: Date.now(),
    };
    versions.unshift(newVersion);
    setVersions(handoutType, versions);
    return versions;
  }, [getVersions, setVersions]);

  return {
    getHandoutData,
    setHandoutData,
    getVersions,
    setVersions,
    addVersion,
  };
};
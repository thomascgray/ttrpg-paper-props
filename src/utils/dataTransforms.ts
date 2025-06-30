import * as _ from 'lodash';
import { iHandoutDefinition } from '../config';

export const transformHandoutData = (
  baseData: any,
  currentData: any,
  name: string,
  value: any | null,
  shouldSpread: boolean = false
): any => {
  let newHandoutData = {
    ...baseData,
    ...currentData,
  };

  // if value is NULL, we need to delete the key
  if (value === null) {
    const [key, index] = name.split('::');
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

  return newHandoutData as any;
};

export const mergeHandoutData = (
  baseData: any,
  savedData: any
): any => {
  return {
    ...baseData,
    ...savedData,
  };
};

export const createVersionFromData = (data: any, timestamp?: number) => {
  return {
    ...data,
    timestamp: timestamp || Date.now(),
  };
};

export const stripTimestampFromVersion = (versionData: any) => {
  const { timestamp, ...dataWithoutTimestamp } = versionData;
  return dataWithoutTimestamp;
};
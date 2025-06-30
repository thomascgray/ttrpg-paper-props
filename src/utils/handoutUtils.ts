import { eHandoutDefinitions, ALL_HANDOUT_DEFINITIONS } from '../config';

export const getHandoutConfig = (handoutType: eHandoutDefinitions) => {
  return ALL_HANDOUT_DEFINITIONS[handoutType];
};

export const getHandoutName = (handoutType: eHandoutDefinitions) => {
  return ALL_HANDOUT_DEFINITIONS[handoutType]?.name || 'Unknown';
};

export const getHandoutCaption = (handoutType: eHandoutDefinitions) => {
  return ALL_HANDOUT_DEFINITIONS[handoutType]?.caption || '';
};

export const extractPositionValues = (handoutData: any) => {
  return {
    rotation: handoutData.positioning?.rotation_degrees?.value || 0,
    zoom: handoutData.positioning?.zoom?.value || 1,
  };
};
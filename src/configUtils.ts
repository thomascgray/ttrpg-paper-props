import { HandoutConfig } from "./types";

export function extractConfigAsData(
  config: HandoutConfig
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(config)) {
    if (Array.isArray(value) && value.length === 2) {
      // It's a ConfigTuple, extract the first element (the value)
      result[key] = value[0];
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // It's a nested HandoutConfig, recurse
      result[key] = extractConfigAsData(value as HandoutConfig);
    }
  }

  return result;
}

export function extractConfigAsFormConfig(
  config: HandoutConfig,
  parentPath: string = ""
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(config)) {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;

    if (Array.isArray(value) && value.length === 2) {
      // It's a ConfigTuple, create the mini object
      result[key] = {
        inputConfig: value[1],
        path: currentPath,
      };
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      // It's a nested HandoutConfig, recurse
      result[key] = extractConfigAsFormConfig(
        value as HandoutConfig,
        currentPath
      );
    }
  }

  return result;
}
import Dexie, { type EntityTable } from "dexie";
import { nanoid } from "nanoid";
import { AppConfigTable, HandoutTable, VersionTable } from "./types";
import { allConfigs, AllConfigNames } from "./handoutConfigs";
import { extractConfigAsData } from "./configUtils";
import { appState } from "./appState";
import { getHandoutFromPath } from "./routes";

export const APP_VERSION = 10;

// Database initialization state
let dbInitialized = false;
let dbInitPromise: Promise<void> | null = null;
let dbInitError: Error | null = null;

export const db = new Dexie("handoutsdb") as Dexie & {
  handouts: EntityTable<HandoutTable, "id">;
  versions: EntityTable<VersionTable, "id">;
  appConfig: EntityTable<AppConfigTable, "id">;
};

db.version(APP_VERSION).stores({
  handouts: "++id, type, data",
  versions: "++id, handoutType, timestamp, createdAt",
  appConfig:
    "id, appVersion, selectedHandoutType, selectedVersionId, updatedAt",
});

// Check version and reset database if needed
async function checkAndResetDatabase() {
  try {
    const config = await db.appConfig.get("APP_CONFIG");
    if (config && config.appVersion !== APP_VERSION) {
      console.log(
        `Database version mismatch. Current: ${config.appVersion}, Expected: ${APP_VERSION}. Resetting database.`
      );
      await db.delete();
      await db.open();
    }
  } catch (error) {
    // If there's any error accessing the config, just continue
    console.log(
      "Error checking database version, continuing with existing database:",
      error
    );
  }
}

// Save current app state to database
export async function saveAppConfig() {
  try {
    await db.appConfig.put({
      id: "APP_CONFIG",
      appVersion: APP_VERSION,
      selectedHandoutType: appState.selectedHandoutType,
      selectedVersionId: appState.selectedVersionId,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.log("Error saving app config:", error);
  }
}

// Initialize app state from database
async function initializeAppState() {
  await checkAndResetDatabase();

  // Check if URL has a route first
  const handoutFromUrl = getHandoutFromPath();

  try {
    const config = await db.appConfig.get("APP_CONFIG");
    if (handoutFromUrl) {
      // URL route takes precedence
      appState.selectedHandoutType = handoutFromUrl;
      appState.selectedVersionId = "TRANSIENT";
    } else if (config) {
      // Use saved config if no URL route
      appState.selectedHandoutType =
        config.selectedHandoutType as AllConfigNames;
      appState.selectedVersionId = config.selectedVersionId;
    } else {
      // Create default config
      await saveAppConfig();
    }
  } catch (error) {
    console.log("Error loading app config, using defaults:", error);
    if (handoutFromUrl) {
      appState.selectedHandoutType = handoutFromUrl;
      appState.selectedVersionId = "TRANSIENT";
    }
    await saveAppConfig();
  }
}

// Initialize database with transient handouts
async function initializeDatabase() {
  try {
    console.log("Starting database initialization...");
    await initializeAppState();

    // for each handout, add a transient handout
    for (const config of allConfigs) {
      try {
        await db.handouts.add({
          id: `TRANSIENT_${config.name}`,
          type: config.name,
          data: extractConfigAsData(config.config),
        });
        console.log(`Created transient handout for ${config.name}`);
      } catch (error) {
        // Ignore errors for already existing transient records
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        if (!errorMessage.includes("already exists")) {
          console.error(
            `Error adding transient handout ${config.name}:`,
            error
          );
          throw error; // Re-throw non-duplicate errors
        }
      }
    }

    dbInitialized = true;
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Database initialization failed:", error);
    dbInitError = error instanceof Error ? error : new Error(String(error));
    throw error;
  }
}

// Export function to check if database is ready
export function isDatabaseReady(): boolean {
  return dbInitialized;
}

// Export function to wait for database initialization
export function waitForDatabase(): Promise<void> {
  if (dbInitialized) {
    return Promise.resolve();
  }
  if (dbInitError) {
    return Promise.reject(dbInitError);
  }
  if (dbInitPromise) {
    return dbInitPromise;
  }
  return Promise.reject(new Error("Database initialization not started"));
}

// Start database initialization
dbInitPromise = initializeDatabase().catch((error) => {
  console.error("Failed to initialize database:", error);
  dbInitError = error instanceof Error ? error : new Error(String(error));
});

// Export function to reset database completely
export async function resetDatabase(): Promise<void> {
  try {
    console.log("Resetting database...");
    await db.delete();
    console.log("Database deleted successfully");
    // Reset initialization state
    dbInitialized = false;
    dbInitPromise = null;
    dbInitError = null;
  } catch (error) {
    console.error("Error resetting database:", error);
    throw error;
  }
}

export const getLatestVersion = async (handoutType: string) => {
  const versions = await db.versions
    .where("handoutType")
    .equals(handoutType)
    .reverse()
    .toArray();

  return versions[0];
};

export const saveVersion = async (handoutType: string, data: any) => {
  const newVersion: VersionTable = {
    id: nanoid(),
    handoutType,
    data: {
      ...data,
    },
    timestamp: Date.now(),
    createdAt: new Date(),
  };

  await db.versions.add(newVersion);

  // update the app state to the latest version
  appState.selectedVersionId = newVersion.id;
};

export const updateTransientRecordToVersion = async (versionId: string) => {
  const version = await db.versions.get(versionId);
  if (version) {
    await updateTransientRecord(version.handoutType, version.data);
    appState.selectedVersionId = versionId;
  }
};

export const updateTransientRecord = async (handoutType: string, data: any) => {
  // dont update the id tho
  await db.handouts
    .where("id")
    .equals(`TRANSIENT_${handoutType}`)
    .modify({
      data: {
        ...data,
        id: `TRANSIENT_${handoutType}`,
      },
    });
};

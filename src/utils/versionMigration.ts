import { db, AllConfigNames } from "../db";

const VERSION = "0.3";
const localStorageKey = `${VERSION}_tomg_rpg_handout_builder`;

// Helper function to get localStorage keys for different handout types
const getVersionsKey = (handoutType: string) => {
  return `${localStorageKey}_versions_${handoutType}`;
};

// Map old handout type names to new ones
const mapHandoutType = (oldType: string): AllConfigNames | null => {
  switch (oldType) {
    case "NEWSPAPER":
      return "Newspaper";
    case "NEWSPAPER_CLIPPING":
      return "Newspaper Clipping";
    default:
      return null;
  }
};

// Convert old version format to new format
const convertVersion = (oldVersion: any, handoutType: AllConfigNames) => {
  const { timestamp, ...data } = oldVersion;
  const date = new Date(timestamp);
  
  return {
    handoutType,
    name: `Version saved at ${date.toLocaleString()}`,
    data,
    timestamp,
    createdAt: date,
  };
};

// Check if migration is needed
export const checkMigrationNeeded = (): boolean => {
  // Check if there are any localStorage versions to migrate
  const keysToCheck = ["NEWSPAPER", "NEWSPAPER_CLIPPING"];
  
  for (const oldType of keysToCheck) {
    const versionsKey = getVersionsKey(oldType);
    const existingVersions = localStorage.getItem(versionsKey);
    if (existingVersions) {
      try {
        const parsedVersions = JSON.parse(existingVersions);
        if (Array.isArray(parsedVersions) && parsedVersions.length > 0) {
          return true;
        }
      } catch (e) {
        console.warn(`Failed to parse localStorage versions for ${oldType}:`, e);
      }
    }
  }
  
  return false;
};

// Perform the migration
export const migrateLocalStorageVersions = async (): Promise<{
  success: boolean;
  migrated: number;
  errors: string[];
}> => {
  const errors: string[] = [];
  let migrated = 0;
  
  try {
    const keysToMigrate = ["NEWSPAPER", "NEWSPAPER_CLIPPING"];
    
    for (const oldType of keysToMigrate) {
      const newType = mapHandoutType(oldType);
      if (!newType) {
        errors.push(`Unknown handout type: ${oldType}`);
        continue;
      }
      
      const versionsKey = getVersionsKey(oldType);
      const existingVersions = localStorage.getItem(versionsKey);
      
      if (!existingVersions) {
        continue;
      }
      
      try {
        const parsedVersions = JSON.parse(existingVersions);
        
        if (Array.isArray(parsedVersions)) {
          // Check if versions already exist in Dexie for this handout type
          const existingDexieVersions = await db.versions
            .where("handoutType")
            .equals(newType)
            .count();
          
          if (existingDexieVersions > 0) {
            console.log(`Skipping migration for ${newType} - versions already exist in Dexie`);
            continue;
          }
          
          // Migrate each version
          for (const version of parsedVersions) {
            try {
              const convertedVersion = convertVersion(version, newType);
              await db.versions.add(convertedVersion);
              migrated++;
            } catch (e) {
              errors.push(`Failed to migrate version for ${newType}: ${e}`);
            }
          }
        }
      } catch (e) {
        errors.push(`Failed to parse localStorage versions for ${oldType}: ${e}`);
      }
    }
    
    return {
      success: errors.length === 0,
      migrated,
      errors,
    };
  } catch (e) {
    errors.push(`Migration failed: ${e}`);
    return {
      success: false,
      migrated,
      errors,
    };
  }
};

// Clean up localStorage after successful migration
export const cleanupLocalStorageVersions = (): void => {
  const keysToCleanup = ["NEWSPAPER", "NEWSPAPER_CLIPPING"];
  
  for (const oldType of keysToCleanup) {
    const versionsKey = getVersionsKey(oldType);
    const handoutDataKey = `${localStorageKey}_${oldType}`;
    
    // Remove versions
    localStorage.removeItem(versionsKey);
    
    // Optionally remove handout data too (but be careful - this might be still in use)
    // localStorage.removeItem(handoutDataKey);
  }
};

// Main migration function to be called on app startup
export const performMigrationIfNeeded = async (): Promise<void> => {
  if (!checkMigrationNeeded()) {
    return;
  }
  
  console.log("Starting localStorage to Dexie migration...");
  
  const result = await migrateLocalStorageVersions();
  
  if (result.success) {
    console.log(`Successfully migrated ${result.migrated} versions`);
    cleanupLocalStorageVersions();
  } else {
    console.error("Migration failed:", result.errors);
    console.log(`Partial migration completed: ${result.migrated} versions migrated`);
  }
};
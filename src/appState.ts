import { proxy, subscribe } from "valtio";
import { saveAppConfig } from "./database";
import { allConfigs } from "./handoutConfigs";
import { AllConfigNames } from "./handoutConfigs";

/**
 * we then keep an app state that is transient for things that dont belong in the db, like
 * which handout type is selected
 */
export const appState = proxy<{
  selectedHandoutType: AllConfigNames;
  selectedVersionId: string | undefined;
}>({
  selectedHandoutType: allConfigs[0].name,
  // selectedVersionId: latestVersionOfFirstHandout?.id ?? undefined,
  selectedVersionId: "TRANSIENT",
});

// Auto-save app state changes to database
subscribe(appState, () => {
  saveAppConfig();
});
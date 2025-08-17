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
  backgroundSelectorState: "open" | "closed";
  waitlistSelectorState: "open" | "closed";
  positioningControls: "open" | "closed";
  backgroundType: "color" | "gradient" | "predefined" | "custom";
  backgroundColor: string;
  backgroundGradientStart: string;
  backgroundGradientEnd: string;
  backgroundGradientType: "linear" | "radial" | "conic";
  backgroundGradientAngle: number;
  backgroundGradientPosition: string;
  backgroundPredefinedId: string;
  backgroundCustomImage: string;
  backgroundImageBlur: boolean;
  backgroundImageZoom: number;
}>({
  selectedHandoutType: "NewspaperClipping",
  selectedVersionId: "TRANSIENT",
  backgroundSelectorState: "closed",
  waitlistSelectorState: "closed",
  positioningControls: "closed",
  backgroundType: "color",
  backgroundColor: "#2f3640",
  backgroundGradientStart: "#2f3640",
  backgroundGradientEnd: "#000000",
  backgroundGradientType: "linear",
  backgroundGradientAngle: 180,
  backgroundGradientPosition: "center",
  backgroundPredefinedId: "",
  backgroundCustomImage: "",
  backgroundImageBlur: false,
  backgroundImageZoom: 1,
});

// Auto-save app state changes to database
subscribe(appState, () => {
  saveAppConfig();
});

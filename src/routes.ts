import { AllConfigNames } from "./handoutConfigs";

// URL path to handout type mapping
export const routes: Record<string, AllConfigNames> = {
  "/newspaper": "Newspaper",
  "/newspaper-clipping": "NewspaperClipping",
  "/character-card": "CharacterCard",
  "/letter": "PlainLetter",
  "/book-cover": "BookCover",
  "/labelled-liquid": "LabelledLiquid",
  "/potion": "LabelledLiquid", // Alias for labelled liquid
  "/hanging-sign": "HangingWoodenSign",
  "/directional-sign": "ThreePanelDirectionalSign",
  "/rectangle-sign-1": "Rectangle1WoodenSign",
  "/crt-screen": "CrtScreen",
  "/monitor": "CrtScreen", // Alias for CRT screen
  "/paper-map": "PaperMap",
  "/map": "PaperMap", // Alias for paper map
  "/hologram": "SciFiHologram",
  "/sci-fi-hologram": "SciFiHologram",
  "/polaroid": "Polaroid",
  "/crystal-ball": "CrystalBall",
  "/test": "Test" as any,
};

// Reverse mapping: handout type to URL path
export const handoutToRoute: Record<AllConfigNames, string> = {
  Newspaper: "/newspaper",
  NewspaperClipping: "/newspaper-clipping",
  CharacterCard: "/character-card",
  PlainLetter: "/letter",
  BookCover: "/book-cover",
  LabelledLiquid: "/labelled-liquid",
  HangingWoodenSign: "/hanging-sign",
  ThreePanelDirectionalSign: "/directional-sign",
  Rectangle1WoodenSign: "/rectangle-sign-1",
  CrtScreen: "/crt-screen",
  PaperMap: "/paper-map",
  SciFiHologram: "/hologram",
  Polaroid: "/polaroid",
  CrystalBall: "/crystal-ball",
  Test: "/test" as any,
};

// Get handout type from current URL
export function getHandoutFromPath(): AllConfigNames | null {
  const path = window.location.pathname.toLowerCase();
  return routes[path] || null;
}

// Update URL for given handout type
export function updateUrlForHandout(handoutType: AllConfigNames): void {
  const path = handoutToRoute[handoutType];
  if (path && window.location.pathname !== path) {
    window.history.pushState({ handoutType }, "", path);
  }
}

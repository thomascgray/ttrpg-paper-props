import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "./ink.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { ErrorBoundary } from "./ErrorBoundary";
const theme = createTheme({
  /** Put your mantine theme override here */
});
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const container = document.getElementById("root");

const NoiseFilterDeclaration = () => {
  return (
    <svg className="hidden noise-svg">
      <defs>
        <filter id="noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            baseFrequency="0.2"
            numOctaves="4"
            result="noise"
            type="fractalNoise"
          />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0.5 0.7 0.9 1" />
          </feComponentTransfer>
          <feBlend in2="SourceGraphic" mode="overlay" />
        </filter>
      </defs>
    </svg>
  );
};

const RoughEdgesFilterDeclaration = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="0" width="0">
      <defs>
        <filter id="roughEdges">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <MantineProvider theme={theme}>
              <HelmetProvider>
                <NoiseFilterDeclaration />
                <RoughEdgesFilterDeclaration />
                <App />
              </HelmetProvider>
            </MantineProvider>
          </ClerkProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}

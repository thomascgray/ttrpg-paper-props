import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "./ink.css";
import App from "./App";
import { dpmaporiginal } from "./dpmap2";
import { dpmaporiginalflipped } from "./dpmap3";
import { dpmaporiginalflippedhorizontal } from "./dpmap4";
import { dpmapmadnewone } from "./dpmap5";
import { dpmapmadnewone2 } from "./dpmap6";
import { dpmapmadnewone3 } from "./dpmap7";
import { dpmaporiginalflippedboth } from "./dpmap8";

const container = document.getElementById("root");

const BulgeFilter = () => {
  return (
    <svg
      style={{
        position: "absolute",
        visibility: "hidden",
      }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="svg-root"
      width="381"
      height="166"
      z-index="-1"
    >
      <defs>
        <filter
          id="SphereMapTest"
          filterUnits="objectBoundingBox"
          x="-0.45"
          y="-1.29"
          width="1.9"
          height="3.4"
        >
          <feImage id="mapa" result="Map" xlinkHref={dpmaporiginal}></feImage>
          <feDisplacementMap
            id="despMap"
            in="SourceGraphic"
            in2="map"
            scale="100"
            xChannelSelector="R"
            yChannelSelector="G"
          ></feDisplacementMap>
        </filter>
      </defs>
    </svg>
  );
};

const ComplexBulgeFilterDeclaration = () => {
  // Create a data URL for the circle displacement map

  return (
    <svg
      style={{
        position: "absolute",
        visibility: "hidden",
      }}
    >
      <filter
        id="bulge-weak"
        x="-5%"
        y="-5%"
        width="110%"
        height="110%"
        // x="-75%"
        // y="-75%"
        // width="250%"
        // height="250%"
        // filterUnits="userSpaceOnUse"
      >
        {/* Define the first displacement map image */}
        <feImage result="displacementMap1" xlinkHref={dpmaporiginal}></feImage>

        {/* Define the second displacement map image
        <feImage
          result="displacementMap2"
          xlinkHref={dpmaporiginalflipped}
        ></feImage> */}

        {/* Combine the two displacement maps into a single one */}
        {/* You can change the 'mode' attribute (e.g., "screen", "add", "lighten", "darken") */}
        {/* based on how you want the two maps to interact and combine their pixel values. */}
        {/* <feBlend
          in="displacementMap1"
          in2="displacementMap2"
          mode=""
          result="combinedDisplacementMap"
        ></feBlend> */}

        {/* Apply the single combined displacement map to the source graphic */}
        {/* 'in="SourceGraphic"' means this filter will displace the element it's applied to. */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="combinedDisplacementMap"
          scale="40"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedGraphic"
        ></feDisplacementMap>
      </filter>
    </svg>
  );
};

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
      <HelmetProvider>
        {/* <BulgeFilter /> */}
        {/* <ComplexBulgeFilterDeclaration /> */}
        <NoiseFilterDeclaration />
        <RoughEdgesFilterDeclaration />
        <App />
      </HelmetProvider>
    </StrictMode>
  );
}

import { dpmaporiginal, dpmaporiginal169 } from "../dpmap2";

export const Bulges = ({ scale }: { scale: number }) => {
  return (
    <svg
      style={{
        position: "absolute",
        visibility: "hidden",
      }}
    >
      <filter id="bulge-inner-circle" filterUnits="objectBoundingBox">
        {/* Define the first displacement map image */}
        <feImage result="displacementMap1" xlinkHref={dpmaporiginal}></feImage>

        <feDisplacementMap
          in="SourceGraphic"
          in2="combinedDisplacementMap"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedGraphic"
        ></feDisplacementMap>
      </filter>

      <filter id="bulge-inner-circle-16-9" filterUnits="objectBoundingBox">
        {/* Define the first displacement map image */}
        <feImage
          result="displacementMap1"
          xlinkHref={dpmaporiginal169}
        ></feImage>

        <feDisplacementMap
          in="SourceGraphic"
          in2="combinedDisplacementMap"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedGraphic"
        ></feDisplacementMap>
      </filter>

      <filter
        id="bulge-whole-element"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        // filterUnits="userSpaceOnUse"
      >
        {/* Define the first displacement map image */}
        <feImage
          result="displacementMap1"
          preserveAspectRatio="none"
          xlinkHref={dpmaporiginal}
        ></feImage>

        <feDisplacementMap
          in="SourceGraphic"
          in2="combinedDisplacementMap"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedGraphic"
        ></feDisplacementMap>
      </filter>
    </svg>
  );
};

import { dpmaporiginal } from "../dpmap2";

export const Bulges = ({ scale }: { scale: number }) => {
  return (
    <svg
      style={{
        position: "absolute",
        visibility: "hidden",
      }}
    >
      <filter
        id="bulge-inner-circle"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="userSpaceOnUse"
      >
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

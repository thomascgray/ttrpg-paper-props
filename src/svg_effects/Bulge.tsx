import { dpmaporiginal, dpmaporiginal169 } from "../dpmap2";

export const Bulges = ({ scale, id }: { scale: number; id?: string }) => {
  const innerCircleId = id ? `${id}-bulge-inner-circle` : "bulge-inner-circle";
  const wholeElementId = id ? `${id}-bulge-whole-element` : "bulge-whole-element";

  return (
    <svg
      style={{
        position: "absolute",
        visibility: "hidden",
      }}
    >
      <filter id={innerCircleId} filterUnits="objectBoundingBox">
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
        id={wholeElementId}
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        // filterUnits="userSpaceOnUse"
      >
        {/* Define the first displacement map image */}
        <feImage
          // rotate="45deg"
          result="displacementMap1"
          preserveAspectRatio="none"
          xlinkHref={dpmaporiginal}
        ></feImage>

        <feDisplacementMap
          // rotate="45deg"
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

import React, { useEffect, useRef, useState } from "react";

export const Headline = (props: { text: string }) => {
  const { text } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(100); // Start with a large default font size

  useEffect(() => {
    const adjustFontSize = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      let currentFontSize = fontSize;
      let textWidth: number;

      // Create a temporary span to measure the width of the text
      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.whiteSpace = "nowrap";
      tempSpan.style.fontSize = `${currentFontSize}px`;
      tempSpan.innerHTML = text;
      document.body.appendChild(tempSpan);

      textWidth = tempSpan.offsetWidth;

      // Adjust the font size based on the container width
      while (textWidth > containerWidth && currentFontSize > 0) {
        currentFontSize -= 1;
        tempSpan.style.fontSize = `${currentFontSize}px`;
        textWidth = tempSpan.offsetWidth;
      }

      while (textWidth < containerWidth && currentFontSize > 0) {
        currentFontSize += 1;
        tempSpan.style.fontSize = `${currentFontSize}px`;
        textWidth = tempSpan.offsetWidth;
      }

      setFontSize(currentFontSize);
      document.body.removeChild(tempSpan);
    };

    // Adjust font size on load and whenever the window is resized
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [text, fontSize]);

  return (
    <div ref={containerRef} style={{ width: "100%", textAlign: "center" }}>
      <span style={{ fontSize: `${fontSize}px` }}>{text}</span>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";

interface XYPickerProps {
  size?: number; // size in px of the square picker
  initialValue?: { x: number; y: number };
  onChange?: (coords: { x: number; y: number }) => void;
}

const XYPicker: React.FC<XYPickerProps> = ({
  size = 200,
  onChange,
  initialValue = { x: 0, y: 0 },
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState(initialValue); // relative to center
  const [dragging, setDragging] = useState(false);

  const updateCoords = (clientX: number, clientY: number) => {
    if (!pickerRef.current) return;

    const rect = pickerRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Convert to centered coords
    const centeredX = Math.round(relativeX - rect.width / 2);
    const centeredY = Math.round(relativeY - rect.height / 2);

    setCoords({ x: centeredX, y: centeredY });
    onChange?.({ x: centeredX, y: centeredY });
  };

  // Click or drag to move
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    updateCoords(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    updateCoords(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <label className="block">
      <span className="block mb-1">X y picker</span>

      <div
        ref={pickerRef}
        onMouseDown={handleMouseDown}
        style={{
          width: size,
          height: size,
          border: "1px solid #ccc",
          position: "relative",
          background:
            "repeating-linear-gradient(180deg, #ddd, #ddd 2px, transparent 2px, transparent 6px), " +
            "repeating-linear-gradient(90deg, #ddd, #ddd 2px, white 2px, white 6px)",

          cursor: "crosshair",
          userSelect: "none",
        }}
      >
        {/* Crosshair marker */}
        <div
          style={{
            position: "absolute",
            left: `calc(50% + ${coords.x}px)`,
            top: `calc(50% + ${coords.y}px)`,
            transform: "translate(-50%, -50%)",
            width: 12,
            height: 12,
            background: "red",
            borderRadius: "50%",
            pointerEvents: "none", // so it doesn't block mouse events
          }}
        />
      </div>
    </label>
  );
};

export default XYPicker;

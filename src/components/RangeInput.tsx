import React, { useState, useEffect, useRef } from "react";
import { iStandardComponentProps } from "./";
import { RangeSlider } from "@mantine/core";
export interface iRangeInputProps extends iStandardComponentProps {
  step: number;
  min: number;
  max: number;
  suffix?: string;
}

export const RangeInput = (props: iRangeInputProps) => {
  const [displayValue, setDisplayValue] = useState(props.value);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayValue(props.value);
  }, [props.value]);

  const handleChange = (value: string) => {
    setDisplayValue(value);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced update
    timeoutRef.current = setTimeout(() => {
      props.onUpdate(value);
    }, 10);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <label className="block w-full">
      <span className="block">
        {props.label && (
          <>
            {props.label}:{" "}
            <span className="font-bold">
              {displayValue}
              {props.suffix}
            </span>
          </>
        )}
      </span>
      <input
        className="w-full cursor-pointer"
        type="range"
        value={displayValue}
        onChange={(e) => {
          handleChange(e.currentTarget.value);
        }}
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </label>
  );
};

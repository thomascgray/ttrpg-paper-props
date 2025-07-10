import React, { useState } from "react";
import { iStandardComponentProps } from "./";

export interface iRangeInputProps extends iStandardComponentProps {
  step: number;
  min: number;
  max: number;
  suffix?: string;
}

export const RangeInput = (props: iRangeInputProps) => {
  const [displayValue, setDisplayValue] = useState(props.value);

  return (
    <label className="block w-full">
      <span className="block">
        {props.label}:{" "}
        <span className="font-bold">
          {displayValue}
          {props.suffix}
        </span>
      </span>
      <input
        className="w-full cursor-pointer"
        type="range"
        value={displayValue}
        onChange={(e) => {
          setDisplayValue(e.currentTarget.value);
        }}
        onMouseUp={(e) => {
          props.onUpdate(e.currentTarget.value);
        }}
        onTouchEnd={(e) => {
          props.onUpdate(e.currentTarget.value);
        }}
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </label>
  );
};

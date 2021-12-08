import React from "react";
import { iStandardComponentProps } from "./";

export interface iRangeInputProps extends iStandardComponentProps {
  step: number;
  min: number;
  max: number;
  suffix?: string;
}

export const RangeInput = (props: iRangeInputProps) => {
  return (
    <label className="block w-full">
      <span className="block mb-1">
        {props.label}:{" "}
        <span className="font-bold">
          {props.value}
          {props.suffix}
        </span>
      </span>
      <input
        className="w-full cursor-pointer"
        type="range"
        value={props.value}
        onChange={(e) => {
          props.onUpdate(e.target.value);
        }}
        step={props.step}
        min={props.min}
        max={props.max}
      />
    </label>
  );
};

import React, { useRef, useLayoutEffect } from "react";
import { iStandardComponentProps } from "./";

export const TextInput = (props: iStandardComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);

  useLayoutEffect(() => {
    if (inputRef.current && cursorPositionRef.current) {
      const { start, end } = cursorPositionRef.current;
      inputRef.current.setSelectionRange(start, end);
      cursorPositionRef.current = null;
    }
  }, [props.value]);

  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <input
          ref={inputRef}
          value={props.value}
          className="p-2 text-lg w-full"
          onChange={(e) => {
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            cursorPositionRef.current = { start, end };
            props.onUpdate(e.target.value);
          }}
        />
      </div>
    </label>
  );
};

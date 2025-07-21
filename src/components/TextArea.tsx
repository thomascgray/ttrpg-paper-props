import React, { useRef, useLayoutEffect } from "react";

interface iTextAreaProps {
  label: string;
  value: string;
  rows: number;
  onUpdate: (value: any) => void;
}

export const TextArea = (props: iTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);

  useLayoutEffect(() => {
    if (textareaRef.current && cursorPositionRef.current) {
      const { start, end } = cursorPositionRef.current;
      textareaRef.current.setSelectionRange(start, end);
      cursorPositionRef.current = null;
    }
  }, [props.value]);

  return (
    <label className="block">
      <span className="block mb-1">
        {props.label}{" "}
        <span className="italic">
          You can use{" "}
          <a
            target="_blank"
            className="text-blue-500 underline"
            href="https://www.markdownguide.org/cheat-sheet/"
          >
            markdown
          </a>
          !
        </span>
      </span>

      <textarea
        ref={textareaRef}
        value={props.value}
        className="w-full p-2 text-sm"
        rows={props.rows}
        onChange={(e) => {
          const start = e.target.selectionStart;
          const end = e.target.selectionEnd;
          cursorPositionRef.current = { start, end };
          props.onUpdate(e.target.value);
        }}
      />
    </label>
  );
};

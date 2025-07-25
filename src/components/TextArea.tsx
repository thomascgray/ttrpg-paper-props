import classNames from "classnames";
import React, { useRef, useLayoutEffect, useEffect } from "react";

interface iTextAreaProps {
  label: string;
  value: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
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

  // Auto-resize effect
  useEffect(() => {
    if (props.autoResize && textareaRef.current) {
      const textarea = textareaRef.current;

      // First, set rows to minimum to allow shrinking
      const minRows = props.minRows || 1;
      textarea.rows = minRows;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";

      // Get computed styles
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseInt(computedStyle.lineHeight);
      const paddingTop = parseInt(computedStyle.paddingTop);
      const paddingBottom = parseInt(computedStyle.paddingBottom);

      // Calculate the number of rows needed
      const contentHeight = textarea.scrollHeight - paddingTop - paddingBottom;
      const calculatedRows = Math.ceil(contentHeight / lineHeight);

      // Apply minRows and maxRows constraints
      let finalRows = Math.max(calculatedRows, minRows);
      if (props.maxRows) {
        finalRows = Math.min(finalRows, props.maxRows);
      }

      // Set the rows attribute
      textarea.rows = finalRows;

      // Set the height and overflow based on whether we've hit maxRows
      if (props.maxRows && calculatedRows > props.maxRows) {
        // If content exceeds maxRows, set fixed height and enable scrolling
        const maxHeight = (props.maxRows * lineHeight) + paddingTop + paddingBottom;
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = 'auto';
      } else {
        // Otherwise, set height to content and hide overflow
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = 'hidden';
      }
    }
  }, [props.value, props.autoResize, props.minRows, props.maxRows]);

  return (
    <label className="block">
      <span className="block mb-1 text-sm">
        {props.label}{" "}
        <span className="italic text-gray-600">
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
        className={classNames("w-full p-2 text-sm", {
          "overflow-y-clip": props.autoResize,
        })}
        rows={props.rows || props.minRows || 4}
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

import React from "react";

interface iTextAreaProps {
  label: string;
  value: string;
  rows: number;
  onUpdate: (value: any) => void;
}

export const TextArea = (props: iTextAreaProps) => {
  return (
    <label className="block">
      <span className="block mb-1">
        {props.label}{" "}
        <span className="italic">
          You can use{" "}
          <a
            target="_blank"
            className="text-blue-400 underline"
            href="https://www.markdownguide.org/cheat-sheet/"
          >
            markdown
          </a>
          !
        </span>
      </span>

      <textarea
        value={props.value}
        className="w-full p-2 text-sm"
        rows={props.rows}
        onChange={(e) => {
          props.onUpdate(e.target.value);
        }}
      />
    </label>
  );
};

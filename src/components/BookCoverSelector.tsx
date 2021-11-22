import React from "react";

interface iBookCoverSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const BookCoverSelector = (props: iBookCoverSelector) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <select
          value={props.value}
          className={`p-2 text-lg w-full`}
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option value="/images/ragged-journal-cover.png">
            /Ragged Journal Cover.png
          </option>
        </select>
      </div>
    </label>
  );
};

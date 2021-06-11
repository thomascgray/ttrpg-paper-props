import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";
import { Select } from "../../components/Select";
interface iRaggedJournalCoverProps {
  dataset: typeof PAPER_TYPES["RAGGED_JOURNAL_COVER"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["RAGGED_JOURNAL_COVER"]["data"],
    value: any
  ) => void;
}

export const RaggedJournalCoverForm = (props: iRaggedJournalCoverProps) => {
  return (
    <div className="space-y-4">
      <FontSizeSelector
        label="Text Size"
        value={props.dataset["prose_size"]}
        onUpdate={(newValue) => {
          props.handleDataChange("prose_size", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">
          <span>Main Copy</span>
          <span className="ml-2 italic">
            You can use{" "}
            <a
              className="text-blue-400 underline"
              href="https://www.markdownguide.org/cheat-sheet/"
            >
              markdown
            </a>
            !
          </span>
        </span>
        <div className="flex">
          <textarea
            value={props.dataset["main_copy"]}
            className="p-2 text-lg w-full"
            rows={10}
            onChange={(e) => {
              props.handleDataChange("main_copy", e.target.value);
            }}
          />
        </div>
      </label>

      <Select
        label="Colour"
        value={props.dataset.copy_colour}
        onUpdate={(value) => {
          props.handleDataChange("copy_colour", value);
        }}
        options={[
          { value: "gold", label: "Gold" },
          { value: "red", label: "Red" },
        ]}
      />
    </div>
  );
};

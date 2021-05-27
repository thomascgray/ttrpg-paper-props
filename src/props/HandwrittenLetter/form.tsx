import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";

interface iHandwrittenLetterFormProps {
  dataset: typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["HANDWRITTEN_LETTER"]["data"],
    value: any
  ) => void;
}

export const HandwrittenLetterForm = (props: iHandwrittenLetterFormProps) => {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block mb-1">
          Page Width:{" "}
          <span className="font-bold">
            {props.dataset["page_width_percentage"]}%
          </span>
        </span>
        <input
          className="w-full cursor-pointer"
          type="range"
          value={props.dataset["page_width_percentage"]}
          onChange={(e) => {
            props.handleDataChange("page_width_percentage", e.target.value);
          }}
          step="1"
          min="0"
          max="100"
        />
      </label>

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <FontSelector
        label="Font"
        value={props.dataset["font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("font", newValue);
        }}
      />

      <FontSizeSelector
        label="Text Size"
        value={props.dataset["font_size"]}
        onUpdate={(newValue) => {
          props.handleDataChange("font_size", newValue);
        }}
      />

      <FontWeightSelector
        label="Font Weight"
        value={props.dataset["font_weight"]}
        onUpdate={(newValue) => {
          props.handleDataChange("font_weight", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">
          <span>Prefix Copy</span>
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
            value={props.dataset["prefix"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("prefix", e.target.value);
            }}
          />
        </div>
      </label>

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

      <label className="block">
        <span className="block mb-1">
          <span>Suffix Copy</span>
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
            value={props.dataset["suffix"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("suffix", e.target.value);
            }}
          />
        </div>
      </label>
    </div>
  );
};

import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { TextAlignmentSelector } from "../../components/TextAlignmentSelector";
import { ButtonGroup } from "../../components/ButtonGroup";

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

      <ButtonGroup
        label="Copy Padding"
        value={props.dataset["padding"]}
        onUpdate={(val) => {
          props.handleDataChange("padding", val);
        }}
        tupleSet={[
          ["p-2", "XS"],
          ["p-4", "S"],
          ["p-8", "M"],
          ["p-12", "L"],
          ["p-16", "XL"],
        ]}
      />

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

      <InkColorSelector
        label="Ink Colour"
        value={props.dataset["ink_color"]}
        onUpdate={(newValue) => {
          props.handleDataChange("ink_color", newValue);
        }}
      />

      <FontSizeSelector
        label="Text Size"
        value={props.dataset["font_size"]}
        onUpdate={(newValue) => {
          props.handleDataChange("font_size", newValue);
        }}
      />

      <ButtonGroup
        label="Text Alignment"
        value={props.dataset["text_alignment"]}
        onUpdate={(val) => {
          props.handleDataChange("text_alignment", val);
        }}
        tupleSet={[
          ["text-left", "Left"],
          ["text-center", "Center"],
          ["text-right", "Right"],
          ["text-justify", "Justify"],
        ]}
      />

      <ButtonGroup
        label="Font Weight"
        value={props.dataset["font_weight"]}
        onUpdate={(val) => {
          props.handleDataChange("font_weight", val);
        }}
        tupleSet={[
          ["font-light", "Light"],
          ["font-normal", "Normal"],
          ["font-semibold", "Semi"],
          ["font-bold", "Bold"],
        ]}
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
    </div>
  );
};

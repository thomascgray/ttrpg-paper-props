import React from "react";
import { FontSelector } from "../../components/FontSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { TextAlignmentSelector } from "../../components/TextAlignmentSelector";
import { PAPER_TYPES } from "../../config";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";

interface iNPCCardForm {
  dataset: typeof PAPER_TYPES["NPC_CARD"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["NPC_CARD"]["data"],
    value: any
  ) => void;
}

export const NPCCardForm = (props: iNPCCardForm) => {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block mb-1">
          Page Width:{" "}
          <span className="font-bold">{props.dataset["page_width"]}px</span>
        </span>
        <input
          className="w-full cursor-pointer"
          type="range"
          value={props.dataset["page_width"]}
          onChange={(e) => {
            props.handleDataChange("page_width", e.target.value);
          }}
          step="5"
          min="150"
          max="700"
        />
      </label>

      <hr />

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Image URL</span>
        <div className="flex">
          <input
            value={props.dataset["image_url"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("image_url", e.target.value);
            }}
          />
        </div>
      </label>

      <ImageFilterSelector
        label="Image Effect"
        value={props.dataset.image_filter}
        onUpdate={(newVal) => {
          props.handleDataChange("image_filter", newVal);
        }}
      />

      <FontSelector
        label="Lines Font"
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

      <TextAlignmentSelector
        label="Text Alignment"
        value={props.dataset["text_alignment"]}
        onUpdate={(newValue) => {
          props.handleDataChange("text_alignment", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Line 1</span>
        <input
          value={props.dataset["text_line_one"]}
          className="w-full p-2 text-lg"
          onChange={(e) => {
            props.handleDataChange("text_line_one", e.target.value);
          }}
        />
      </label>

      <label className="block">
        <span className="block mb-1">Line 2</span>
        <input
          value={props.dataset["text_line_two"]}
          className="w-full p-2 text-lg"
          onChange={(e) => {
            props.handleDataChange("text_line_two", e.target.value);
          }}
        />
      </label>

      <label className="block">
        <span className="block mb-1">Line 3</span>
        <input
          value={props.dataset["text_line_three"]}
          className="w-full p-2 text-lg"
          onChange={(e) => {
            props.handleDataChange("text_line_three", e.target.value);
          }}
        />
      </label>
    </div>
  );
};

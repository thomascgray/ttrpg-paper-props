import React from "react";
import { PAPER_TYPES } from "../../config";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { Select } from "../../components/Select";
import { RangeInput } from "../../components/RangeInput";
import { ColourPicker } from "../../components/ColourPicker";
import { InkColorSelector } from "../../components/InkColorSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { TextFilterSelector } from "../../components/TextFilterSelector";
import { FontSelector } from "../../components/FontSelector";

interface iBookCoverProps {
  dataset: (typeof PAPER_TYPES)["BOOK_COVER"]["data"];
  handleDataChange: (
    key: keyof (typeof PAPER_TYPES)["BOOK_COVER"]["data"],
    value: any
  ) => void;
}

export const BookCoverForm = (props: iBookCoverProps) => {
  return (
    <div className="space-y-4">
      <Select
        label={"Book Cover Template"}
        value={props.dataset["book_cover_template"]}
        onUpdate={(newValue) => {
          props.handleDataChange("book_cover_template", newValue);
        }}
        options={[
          {
            label: "Ragged Journal Cover",
            value: "/images/ragged-journal-cover.png",
          },
          {
            label: "Reddy/Orange Leather Bound Book",
            value: "/images/reddy-orange-leather-bound-book.png",
          },
        ]}
      />

      <ImageFilterSelector
        label={"Book Cover Template Image Effect"}
        value={props.dataset["book_cover_template_image_effect"].toString()}
        onUpdate={(newValue) => {
          props.handleDataChange("book_cover_template_image_effect", newValue);
        }}
      />

      <RangeInput
        label={"Book Cover Template Zoom"}
        value={props.dataset["zoom_level_percentage"].toString()}
        onUpdate={(newValue) => {
          props.handleDataChange("zoom_level_percentage", newValue);
        }}
        suffix={"%"}
        min={10}
        max={60}
        step={5}
      />

      <RangeInput
        label={"Extra Left Padding"}
        value={props.dataset["extra_left_margin"].toString()}
        onUpdate={(newValue) => {
          props.handleDataChange("extra_left_margin", newValue);
        }}
        suffix={"em"}
        min={-10}
        max={10}
        step={0.2}
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
        value={props.dataset["prose_size"]}
        onUpdate={(newValue) => {
          props.handleDataChange("prose_size", newValue);
        }}
      />

      <InkColorSelector
        label="Ink Colour"
        value={props.dataset["ink_color"]}
        onUpdate={(newValue) => {
          props.handleDataChange("ink_color", newValue);
        }}
      />

      <TextFilterSelector
        label={"Text Effect"}
        value={props.dataset["text_effect"].toString()}
        onUpdate={(newValue) => {
          props.handleDataChange("text_effect", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">
          <span>Main Copy</span>
          <span className="ml-2 italic">
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

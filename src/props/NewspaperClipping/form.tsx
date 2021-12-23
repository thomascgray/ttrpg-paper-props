import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { CheckboxInput } from "../../components/CheckboxInput";

interface iNewspaperClippingFormProps {
  dataset: typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["NEWSPAPER_CLIPPING"]["data"],
    value: any
  ) => void;
}

export const NewspaperClippingForm = (props: iNewspaperClippingFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <label className="block w-1/2 mr-2">
          <span className="block mb-1">
            Clipping Width:{" "}
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
            min="250"
            max="800"
          />
        </label>

        <label className="block w-1/2">
          <span className="block mb-1">
            Clipping Height:{" "}
            <span className="font-bold">{props.dataset["page_height"]}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["page_height"]}
            onChange={(e) => {
              props.handleDataChange("page_height", e.target.value);
            }}
            step="5"
            min="400"
            max="1200"
          />
        </label>
      </div>

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <CheckboxInput
        label="Enable paper inset shadow?"
        value={props.dataset["is_paper_shadow"]}
        onUpdate={(val) => props.handleDataChange("is_paper_shadow", val)}
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

      <ImageFilterSelector
        label="Image Effect"
        value={props.dataset.image_filter}
        onUpdate={(newVal) => {
          props.handleDataChange("image_filter", newVal);
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
            value={props.dataset["prefix_copy"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("prefix_copy", e.target.value);
            }}
          />
        </div>
      </label>

      <CheckboxInput
        label="Is Prefix Blurry?"
        value={props.dataset["is_prefix_blurry"]}
        onUpdate={(val) => props.handleDataChange("is_prefix_blurry", val)}
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
            value={props.dataset["suffix_copy"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("suffix_copy", e.target.value);
            }}
          />
        </div>
      </label>

      <CheckboxInput
        label="Is Suffix Blurry?"
        value={props.dataset["is_suffix_blurry"]}
        onUpdate={(val) => props.handleDataChange("is_suffix_blurry", val)}
      />
    </div>
  );
};

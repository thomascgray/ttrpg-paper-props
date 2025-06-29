import React from "react";
import { NEWSPAPER_CLIPPING } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { CheckboxInput } from "../../components/CheckboxInput";

interface iNewspaperClippingFormProps {
  dataset: typeof NEWSPAPER_CLIPPING["data"];
  handleDataChange: (
    key: keyof typeof NEWSPAPER_CLIPPING["data"],
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
            <span className="font-bold">{props.dataset.dimensions.page_width.value}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset.dimensions.page_width.value}
            onChange={(e) => {
              props.handleDataChange("dimensions", {
                ...props.dataset.dimensions,
                page_width: { ...props.dataset.dimensions.page_width, value: e.target.value }
              });
            }}
            step="5"
            min="250"
            max="800"
          />
        </label>

        <label className="block w-1/2">
          <span className="block mb-1">
            Clipping Height:{" "}
            <span className="font-bold">{props.dataset.dimensions.page_height.value}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset.dimensions.page_height.value}
            onChange={(e) => {
              props.handleDataChange("dimensions", {
                ...props.dataset.dimensions,
                page_height: { ...props.dataset.dimensions.page_height, value: e.target.value }
              });
            }}
            step="5"
            min="400"
            max="1200"
          />
        </label>
      </div>

      <PaperTextureSelect
        value={props.dataset.paper.paper_texture.value}
        onUpdate={(newValue) => {
          props.handleDataChange("paper", {
            ...props.dataset.paper,
            paper_texture: { ...props.dataset.paper.paper_texture, value: newValue }
          });
        }}
      />

      <CheckboxInput
        label="Enable paper inset shadow?"
        value={props.dataset.paper.is_paper_shadow.value}
        onUpdate={(val) => props.handleDataChange("paper", {
          ...props.dataset.paper,
          is_paper_shadow: { ...props.dataset.paper.is_paper_shadow, value: val }
        })}
      />

      <FontSelector
        label="Font"
        value={props.dataset.font.value}
        onUpdate={(newValue) => {
          props.handleDataChange("font", { ...props.dataset.font, value: newValue });
        }}
      />

      <InkColorSelector
        label="Ink Colour"
        value={props.dataset.ink_color.value}
        onUpdate={(newValue) => {
          props.handleDataChange("ink_color", { ...props.dataset.ink_color, value: newValue });
        }}
      />

      <ImageFilterSelector
        label="Image Effect"
        value={props.dataset.image_filter.value}
        onUpdate={(newVal) => {
          props.handleDataChange("image_filter", { ...props.dataset.image_filter, value: newVal });
        }}
      />

      <label className="block">
        <span className="block mb-1">
          <span>Prefix Copy</span>
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
            value={props.dataset.prefix_copy.value}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("prefix_copy", { ...props.dataset.prefix_copy, value: e.target.value });
            }}
          />
        </div>
      </label>

      <CheckboxInput
        label="Is Prefix Blurry?"
        value={props.dataset.is_prefix_blurry.value}
        onUpdate={(val) => props.handleDataChange("is_prefix_blurry", { ...props.dataset.is_prefix_blurry, value: val })}
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
            value={props.dataset.main_copy.value}
            className="p-2 text-lg w-full"
            rows={10}
            onChange={(e) => {
              props.handleDataChange("main_copy", { ...props.dataset.main_copy, value: e.target.value });
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
            value={props.dataset.suffix_copy.value}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("suffix_copy", { ...props.dataset.suffix_copy, value: e.target.value });
            }}
          />
        </div>
      </label>

      <CheckboxInput
        label="Is Suffix Blurry?"
        value={props.dataset.is_suffix_blurry.value}
        onUpdate={(val) => props.handleDataChange("is_suffix_blurry", { ...props.dataset.is_suffix_blurry, value: val })}
      />
    </div>
  );
};

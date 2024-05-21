import React from "react";
import { FontSelector } from "../../components/FontSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { TextAlignmentSelector } from "../../components/TextAlignmentSelector";
import { PAPER_TYPES } from "../../config";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { ImageUrl } from "../../components/ImageUrl";
import { ButtonGroup } from "../../components/ButtonGroup";
import { CheckboxInput } from "../../components/CheckboxInput";

interface iNPCCardForm {
  dataset: (typeof PAPER_TYPES)["NPC_CARD"]["data"];
  handleDataChange: (
    key: keyof (typeof PAPER_TYPES)["NPC_CARD"]["data"],
    value: any
  ) => void;
}

export const NPCCardForm = (props: iNPCCardForm) => {
  return (
    <div className="space-y-5">
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

      <ImageUrl
        label="Image URL"
        value={props.dataset.image_url}
        onUpdate={(newVal) => {
          props.handleDataChange("image_url", newVal);
        }}
      />

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

      <ButtonGroup
        label="Text Alignment"
        value={props.dataset["text_alignment"]}
        onUpdate={(val) => {
          props.handleDataChange("text_alignment", val);
        }}
        tupleSetElements={[
          [
            "text-left",
            <span title="Left">
              <svg
                className="text-black font-bold"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H7.5C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H10.5C10.7761 10 11 10.2239 11 10.5C11 10.7761 10.7761 11 10.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>,
          ],
          [
            "text-center",
            <span title="Center">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM4 7.5C4 7.22386 4.22386 7 4.5 7H10.5C10.7761 7 11 7.22386 11 7.5C11 7.77614 10.7761 8 10.5 8H4.5C4.22386 8 4 7.77614 4 7.5ZM3 10.5C3 10.2239 3.22386 10 3.5 10H11.5C11.7761 10 12 10.2239 12 10.5C12 10.7761 11.7761 11 11.5 11H3.5C3.22386 11 3 10.7761 3 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>,
          ],
          [
            "text-right",
            <span title="Right">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.5C2 4.22386 2.22386 4 2.5 4H12.5C12.7761 4 13 4.22386 13 4.5C13 4.77614 12.7761 5 12.5 5H2.5C2.22386 5 2 4.77614 2 4.5ZM7 7.5C7 7.22386 7.22386 7 7.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H7.5C7.22386 8 7 7.77614 7 7.5ZM4 10.5C4 10.2239 4.22386 10 4.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H4.5C4.22386 11 4 10.7761 4 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>,
          ],
          [
            "text-justify",
            <span title="Justified">
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>,
          ],
        ]}
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

import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";
import { BorderRadiusSelector } from "../../components/BorderRadiusSelector";
import { TextInput } from "../../components/TextInput";
import { CheckboxInput } from "../../components/CheckboxInput";
import { TextArea } from "../../components/TextArea";

interface iTicketFormProps {
  dataset: typeof PAPER_TYPES["TICKET"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["TICKET"]["data"],
    value: any
  ) => void;
}

export const TicketForm = (props: iTicketFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <label className="block mr-2">
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
            step="20"
            min="240"
            max="800"
          />
        </label>

        <label className="block ml-2">
          <span className="block mb-1">
            Page Height:{" "}
            <span className="font-bold">{props.dataset["page_height"]}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["page_height"]}
            onChange={(e) => {
              props.handleDataChange("page_height", e.target.value);
            }}
            step="20"
            min="240"
            max="800"
          />
        </label>
      </div>

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <BorderRadiusSelector
        label="Rounded Corners"
        value={props.dataset["rounded_corners"]}
        onUpdate={(newValue) => {
          props.handleDataChange("rounded_corners", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Saw Tooth Borders</span>
        <div className="flex">
          <select
            value={props.dataset["sawtooth_border"]}
            className={`p-2 text-lg w-full`}
            onChange={(e) => {
              props.handleDataChange("sawtooth_border", e.target.value);
            }}
          >
            <option value="sawtooth-border-none">None</option>
            <option value="sawtooth-border-y">Top & Bottom</option>
            <option value="sawtooth-border-x">Left & Right</option>
          </select>
        </div>
      </label>

      <TextInput
        label="Left Margin Copy"
        value={props.dataset.left_margin_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("left_margin_copy", newValue);
        }}
      />

      <CheckboxInput
        label="Hide Left Margin?"
        value={props.dataset.hide_left_margin_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("hide_left_margin_copy", newValue);
        }}
      />

      <TextArea
        label="Top Copy"
        rows={3}
        value={props.dataset.top_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("top_copy", newValue);
        }}
      />

      <div className="flex">
        <div className="mr-2">
          <TextInput
            label="Middle Left Copy"
            value={props.dataset.middle_left_copy}
            onUpdate={(newValue) => {
              props.handleDataChange("middle_left_copy", newValue);
            }}
          />
        </div>

        <div className="ml-2">
          <TextInput
            label="Middle Right Copy"
            value={props.dataset.middle_right_copy}
            onUpdate={(newValue) => {
              props.handleDataChange("middle_right_copy", newValue);
            }}
          />
        </div>
      </div>

      <TextInput
        label="Bottom Copy"
        value={props.dataset.botom_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("botom_copy", newValue);
        }}
      />

      <TextInput
        label="Right Margin Copy"
        value={props.dataset.right_margin_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("right_margin_copy", newValue);
        }}
      />

      <CheckboxInput
        label="Hide Right Margin?"
        value={props.dataset.hide_right_margin_copy}
        onUpdate={(newValue) => {
          props.handleDataChange("hide_right_margin_copy", newValue);
        }}
      />
    </div>
  );
};

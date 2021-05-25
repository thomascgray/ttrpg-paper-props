import React from "react";
import { PAPER_TYPES } from "../config";
import { PaperTextureSelect } from "../components/PaperTextureSelect";
import { FontSelector } from "../components/FontSelector";

interface iWantedPosterFormProps {
  dataset: typeof PAPER_TYPES["WANTED_POSTER"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["WANTED_POSTER"]["data"],
    value: any
  ) => void;
}

export const WantedPosterForm = (props: iWantedPosterFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex">
        <label className="block w-1/2 mr-2">
          <span className="block mb-1">
            Rotation:{" "}
            <span className="font-bold">
              {props.dataset["rotation_degrees"]}°
            </span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["rotation_degrees"]}
            onChange={(e) => {
              props.handleDataChange("rotation_degrees", e.target.value);
            }}
            step="1"
            min="-10"
            max="10"
          />
        </label>

        <label className="block w-1/2 ml-2">
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
            min="350"
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

      <label className="block">
        <span className="block mb-1">Headline</span>
        <div className="flex">
          <input
            value={props.dataset["headline"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("headline", e.target.value);
            }}
          />
        </div>
      </label>

      <FontSelector
        label="Headline Font"
        value={props.dataset["headline_font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("headline_font", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Subtitle</span>
        <div className="flex">
          <input
            value={props.dataset["subtitle"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("subtitle", e.target.value);
            }}
          />
        </div>
      </label>

      <FontSelector
        label="Subtitle Font"
        value={props.dataset["subtitle_font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("subtitle_font", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Subtitle 2</span>
        <div className="flex">
          <input
            value={props.dataset["subtitle2"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("subtitle2", e.target.value);
            }}
          />
        </div>
      </label>

      <FontSelector
        label="Subtitle 2 Font"
        value={props.dataset["subtitle2_font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("subtitle2_font", newValue);
        }}
      />
    </div>
  );
};

import React from "react";
import { PAPER_TYPES } from "../config";

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

      <label className="block">
        <span className="block mb-1">Paper Texture</span>
        <div className="flex">
          <select
            value={props.dataset["paper_texture"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("paper_texture", e.target.value);
            }}
          >
            <option value="grey">Grey</option>
            <option value="beige">Beige</option>
            <option value="cream">Cream</option>
          </select>
        </div>
      </label>

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

      <label className="block">
        <span className="block mb-1">Headline Font</span>
        <div className="flex">
          <select
            value={props.dataset["headline_font"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("headline_font", e.target.value);
            }}
          >
            <option value="font-alfa-slab-one">Alfa Slab One</option>
            <option value="font-newsreader">Newsreader</option>
            <option value="font-noticia-text">Noticia Text</option>
          </select>
        </div>
      </label>

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
    </div>
  );
};

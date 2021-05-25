import React from "react";
import { PAPER_TYPES } from "../config";
import { PaperTextureSelect } from "../components/PaperTextureSelect";
import { FontSelector } from "../components/FontSelector";

interface iNewspaperFormProps {
  dataset: typeof PAPER_TYPES["NEWSPAPER"]["data"];
  handleDataChange: (
    key: keyof typeof PAPER_TYPES["NEWSPAPER"]["data"],
    value: any
  ) => void;
}

export const NewspaperForm = (props: iNewspaperFormProps) => {
  return (
    <div className="space-y-4">
      <label className="block w-1/2 mr-2">
        <span className="block mb-1">
          Zoom: <span className="font-bold">{props.dataset["zoom"]}</span>
        </span>
        <input
          className="w-full cursor-pointer"
          type="range"
          value={props.dataset["zoom"]}
          onChange={(e) => {
            props.handleDataChange("zoom", e.target.value);
          }}
          step="0.05"
          min="0.1"
          max="1.9"
        />
      </label>

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
            step="2"
            min="-20"
            max="20"
          />
        </label>

        <label className="block w-1/2 ml-2">
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
      </div>

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Title</span>
        <div className="flex">
          <input
            value={props.dataset["title"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("title", e.target.value);
            }}
          />
        </div>
      </label>

      <FontSelector
        label="Title Font"
        value={props.dataset["title_font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("title_font", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Banner Text</span>
        <div className="flex">
          <input
            value={props.dataset["banner_text"]}
            className="p-2 text-lg w-full"
            onChange={(e) => {
              props.handleDataChange("banner_text", e.target.value);
            }}
          />
        </div>
      </label>

      <label className="block">
        <span className="block mb-1">Date</span>
        <div className="flex">
          <input
            type="date"
            className="p-2 text-lg w-full"
            value={props.dataset["date"]}
            onChange={(e) => {
              props.handleDataChange("date", e.target.value);
            }}
            min="2018-01-01"
            max="2018-12-31"
          />
        </div>
      </label>

      <label className="block">
        <span className="block mb-1">Headline</span>
        <input
          value={props.dataset["headline"]}
          className="w-full p-2 text-lg"
          onChange={(e) => {
            props.handleDataChange("headline", e.target.value);
          }}
        />
      </label>

      <FontSelector
        label="Headline Font"
        value={props.dataset["headline_font"]}
        onUpdate={(newValue) => {
          props.handleDataChange("headline_font", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Quote / Call Out</span>
        <input
          value={props.dataset["quote"]}
          className="w-full p-2 text-lg"
          onChange={(e) => {
            props.handleDataChange("quote", e.target.value);
          }}
        />
      </label>

      <label className="block">
        <span className="block mb-1">
          Main Copy{" "}
          <span className="italic">
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

        <textarea
          value={props.dataset["main_copy"]}
          className="w-full p-2 text-lg"
          rows={20}
          onChange={(e) => {
            props.handleDataChange("main_copy", e.target.value);
          }}
        />
      </label>

      <label className="block">
        <span className="block mb-1">
          Main Copy Columns:{" "}
          <span className="font-bold">
            {props.dataset["main_copy_columns"]}
          </span>
        </span>
        <input
          className="w-full cursor-pointer"
          type="range"
          value={props.dataset["main_copy_columns"]}
          onChange={(e) => {
            props.handleDataChange("main_copy_columns", e.target.value);
          }}
          step="1"
          min="1"
          max="4"
        />
      </label>

      <label className="block">
        <span className="block mb-1">Is Main Copy Blurry?</span>
        <div className="flex">
          <input
            type="checkbox"
            checked={props.dataset["is_main_copy_blurry"]}
            className="p-2 ml-1 mt-1 transform scale-150"
            onChange={(e) => {
              props.handleDataChange("is_main_copy_blurry", e.target.checked);
            }}
          />
        </div>
      </label>
    </div>
  );
};

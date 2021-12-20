import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";

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

      <PaperTextureSelect
        value={props.dataset["paper_texture"]}
        onUpdate={(newValue) => {
          props.handleDataChange("paper_texture", newValue);
        }}
      />

      <label className="block">
        <span className="block mb-1">Enable paper inset shadow?</span>
        <div className="flex">
          <input
            type="checkbox"
            checked={props.dataset["is_paper_shadow"]}
            className="p-2 ml-1 mt-1 transform scale-150 text-red-500"
            onChange={(e) => {
              props.handleDataChange("is_paper_shadow", e.target.checked);
            }}
          />
        </div>
      </label>

      <InkColorSelector
        label="Ink Colour"
        value={props.dataset["ink_color"]}
        onUpdate={(newValue) => {
          props.handleDataChange("ink_color", newValue);
        }}
      />

      <div className="bg-gray-400 space-y-4 p-2">
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
          <span className="block mb-1">
            Title Size:{" "}
            <span className="font-bold">{props.dataset["title_size"]}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["title_size"]}
            onChange={(e) => {
              props.handleDataChange("title_size", e.target.value);
            }}
            step="2"
            min="26"
            max="200"
          />
        </label>
      </div>

      <div className="bg-gray-400 space-y-4 p-2">
        <label className="block">
          <span className="block mb-1">Banner Item Text 1</span>
          <div className="flex">
            <input
              value={props.dataset["banner_text_1"]}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                props.handleDataChange("banner_text_1", e.target.value);
              }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block mb-1">Banner Item Text 2</span>
          <div className="flex">
            <input
              value={props.dataset["banner_text_2"]}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                props.handleDataChange("banner_text_2", e.target.value);
              }}
            />
          </div>
        </label>

        <label className="block">
          <span className="block mb-1">Banner Item Text 3</span>
          <div className="flex">
            <input
              value={props.dataset["banner_text_3"]}
              className="p-2 text-lg w-full"
              onChange={(e) => {
                props.handleDataChange("banner_text_3", e.target.value);
              }}
            />
          </div>
        </label>

        <FontSelector
          label="Banner Items Font"
          value={props.dataset["banner_font"]}
          onUpdate={(newValue) => {
            props.handleDataChange("banner_font", newValue);
          }}
        />

        <label className="block">
          <span className="block mb-1">
            Banner Text Size:{" "}
            <span className="font-bold">{props.dataset["banner_size"]}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["banner_size"]}
            onChange={(e) => {
              props.handleDataChange("banner_size", e.target.value);
            }}
            step="2"
            min="12"
            max="60"
          />
        </label>

        <div className="flex flex-row">
          <label className="block mr-4">
            <span className="block mb-1">Hide top banner border?</span>
            <div className="flex">
              <input
                type="checkbox"
                checked={props.dataset["hide_top_banner_border"]}
                className="p-2 ml-1 mt-1 transform scale-150 text-red-500"
                onChange={(e) => {
                  props.handleDataChange(
                    "hide_top_banner_border",
                    e.target.checked
                  );
                }}
              />
            </div>
          </label>
          <label className="block mr-4">
            <span className="block mb-1">Hide bottom banner border?</span>
            <div className="flex">
              <input
                type="checkbox"
                checked={props.dataset["hide_bottom_banner_border"]}
                className="p-2 ml-1 mt-1 transform scale-150 text-red-500"
                onChange={(e) => {
                  props.handleDataChange(
                    "hide_bottom_banner_border",
                    e.target.checked
                  );
                }}
              />
            </div>
          </label>
        </div>
      </div>

      <div className="bg-gray-400 space-y-4 p-2">
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
      </div>

      <div className="bg-gray-400 space-y-4 p-2">
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

        <FontSelector
          label="Quote Font"
          value={props.dataset["quote_font"]}
          onUpdate={(newValue) => {
            props.handleDataChange("quote_font", newValue);
          }}
        />

        <label className="block">
          <span className="block mb-1">
            Quote Size:{" "}
            <span className="font-bold">{props.dataset["quote_size"]}px</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["quote_size"]}
            onChange={(e) => {
              props.handleDataChange("quote_size", e.target.value);
            }}
            step="1"
            min="12"
            max="60"
          />
        </label>
      </div>

      <div className="bg-gray-400 space-y-4 p-2">
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

        <ImageFilterSelector
          label={"Main Copy Image(s) Effect"}
          value={props.dataset["image_filter"].toString()}
          onUpdate={(newValue) => {
            props.handleDataChange("image_filter", newValue);
          }}
        />

        <label className="block">
          <span className="block mb-1">Is Main Copy Blurry?</span>
          <div className="flex">
            <input
              type="checkbox"
              checked={props.dataset["is_main_copy_blurry"]}
              className="p-2 ml-1 mt-1 transform scale-150 text-red-500"
              onChange={(e) => {
                props.handleDataChange("is_main_copy_blurry", e.target.checked);
              }}
            />
          </div>
        </label>
      </div>
    </div>
  );
};

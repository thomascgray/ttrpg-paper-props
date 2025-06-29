import React from "react";
// import { PAPER_TYPES } from "../../config"; // NEWSPAPER_ALT definition not found in config
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { CheckboxInput } from "../../components/CheckboxInput";
import { GridBuilder } from "../../components/GridBuilder";

interface iNewspaperFormProps {
  dataset: any; // (typeof PAPER_TYPES)["NEWSPAPER_ALT"]["data"] - NEWSPAPER_ALT definition not found in config
  handleDataChange: (
    key: string, // keyof (typeof PAPER_TYPES)["NEWSPAPER_ALT"]["data"] - NEWSPAPER_ALT definition not found in config
    value: any
  ) => void;
  setHighlighted: (section: string) => void;
}

export const NewspaperFormAlt1 = (props: iNewspaperFormProps) => {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block mb-1">Grid Builder</span>
        <GridBuilder
          gridData={props.dataset.gridData}
          onGridDataUpdate={(gridData) => {
            props.handleDataChange("gridData", gridData);
          }}
        />
      </label>

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

      <CheckboxInput
        label="Enable paper inset shadow?"
        value={props.dataset["is_paper_shadow"]}
        onUpdate={(val) => props.handleDataChange("is_paper_shadow", val)}
      />

      <InkColorSelector
        label="Ink Colour"
        value={props.dataset["ink_color"]}
        onUpdate={(newValue) => {
          props.handleDataChange("ink_color", newValue);
        }}
      />

      <div className="bg-gray-400 space-y-4 p-2">
        <label
          className="block"
          // onMouseOver={() => {
          //   props.setHighlighted("newspaper-title");
          // }}
          // onMouseLeave={() => {
          //   props.setHighlighted("");
          // }}
        >
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
              className="p-2 text-sm w-full"
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

        <div className="flex flex-row items-center space-x-4">
          <CheckboxInput
            label="Hide top banner border?"
            value={props.dataset["hide_top_banner_border"]}
            onUpdate={(val) =>
              props.handleDataChange("hide_top_banner_border", val)
            }
          />
          <CheckboxInput
            label="Hide bottom banner border?"
            value={props.dataset["hide_bottom_banner_border"]}
            onUpdate={(val) =>
              props.handleDataChange("hide_bottom_banner_border", val)
            }
          />
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
                target="_blank"
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

        <CheckboxInput
          label="Is Main Copy Blurry?"
          value={props.dataset["is_main_copy_blurry"]}
          onUpdate={(val) => props.handleDataChange("is_main_copy_blurry", val)}
        />
      </div>
    </div>
  );
};

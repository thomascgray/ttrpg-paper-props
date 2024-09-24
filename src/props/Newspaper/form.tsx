import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { ImageFilterSelector } from "../../components/ImageFilterSelector";
import { InkColorSelector } from "../../components/InkColorSelector";
import { CheckboxInput } from "../../components/CheckboxInput";
import { FormDetails } from "../../components/FormDetails";
import { RangeInput } from "../../components/RangeInput";
import { NEWSPAPER } from "../../config2";
import { ConfigFormRenderer } from "../../ConfigFormRenderer";

interface iNewspaperFormProps {
  dataset: (typeof PAPER_TYPES)["NEWSPAPER"]["data"];
  handleDataChange: (
    key: keyof (typeof PAPER_TYPES)["NEWSPAPER"]["data"],
    value: any
  ) => void;
  setHighlighted: (section: string) => void;
}

export const NewspaperForm = (props: iNewspaperFormProps) => {
  return (
    <div className="space-y-4">
      <ConfigFormRenderer config={NEWSPAPER} dataset={props.dataset} />

      {/* <label className="block">
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
      </label> */}

      {/* <PaperTextureSelect
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

      <FormDetails
        for="newspaper-title"
        title="Title"
        description="Main title of the newspaper"
      >
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

        <label className="block">
          <span className="block mb-1">
            Line Height:{" "}
            <span className="font-bold">{props.dataset["line_height"]}em</span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["line_height"]}
            onChange={(e) => {
              props.handleDataChange("line_height", e.target.value);
            }}
            step="0.1"
            min="0.2"
            max="4"
          />
        </label>

        <RangeInput
          label="Top Margin"
          value={props.dataset["top_margin"]}
          onUpdate={(newValue) => {
            props.handleDataChange("top_margin", newValue);
          }}
          suffix="px"
          min={-100}
          max={100}
          step={1}
        />
        <RangeInput
          label="Bottom Margin"
          value={props.dataset["bottom_margin"]}
          onUpdate={(newValue) => {
            props.handleDataChange("bottom_margin", newValue);
          }}
          suffix="px"
          min={-100}
          max={100}
          step={1}
        />
      </FormDetails> */}

      <FormDetails title="Banner Texts" for="newspaper-banner-texts">
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
      </FormDetails>

      <FormDetails title="Headline" for="newspaper-headline">
        <label className="block">
          <span className="block mb-1">Headline</span>
          <textarea
            value={props.dataset["headline"]}
            className="w-full p-2 text-lg"
            rows={3}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
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

        <RangeInput
          label="Font Size"
          value={props.dataset["headline_font_size"]}
          onUpdate={(newValue) => {
            props.handleDataChange("headline_font_size", newValue);
          }}
          suffix="px"
          min={26}
          max={200}
          step={2}
        />
      </FormDetails>

      <FormDetails title="Quote / Call Out" for="newspaper-quote-call-out">
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
      </FormDetails>

      <FormDetails title="Main Copy" for="newspaper-main-copy">
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
      </FormDetails>
    </div>
  );
};

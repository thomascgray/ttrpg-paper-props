import React from "react";
import { PAPER_TYPES } from "../../config";
import { PaperTextureSelect } from "../../components/PaperTextureSelect";
import { FontSelector } from "../../components/FontSelector";
import { FontSizeSelector } from "../../components/FontSizeSelector";
import { FontWeightSelector } from "../../components/FontWeightSelector";

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
            <span className="font-bold">
              {props.dataset["page_width"]}px
            </span>
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

        <label className="block ml-2">
          <span className="block mb-1">
            Page Height:{" "}
            <span className="font-bold">
              {props.dataset["page_height"]}px
            </span>
          </span>
          <input
            className="w-full cursor-pointer"
            type="range"
            value={props.dataset["page_height"]}
            onChange={(e) => {
              props.handleDataChange("page_height", e.target.value);
            }}
            step="5"
            min="250"
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

      
{/* 
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
            value={props.dataset["prefix"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("prefix", e.target.value);
            }}
          />
        </div>
      </label> */}

      

      {/* <label className="block">
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
            value={props.dataset["suffix"]}
            className="p-2 text-lg w-full"
            rows={3}
            onChange={(e) => {
              props.handleDataChange("suffix", e.target.value);
            }}
          />
        </div>
      </label> */}
    </div>
  );
};

import React from "react";
import { PAPER_TYPES } from "../config";

// @ts-ignore
import { Textfit } from "react-textfit";

export const WantedPoster = (
  props: typeof PAPER_TYPES["WANTED_POSTER"]["data"]
) => {
  return (
    <div className="paper transform rotate-1 bg-yellow-50 w-4/5 mx-auto mt-8 p-10">
      <Textfit mode="single">
        <h1 className="border-4 border-gray-800 border-l-0 border-r-0 border-solid font-serif font-black text-center">
          {props.headline}
        </h1>
      </Textfit>

      <img className="mx-auto mt-10" src={props.image_url} alt="" />
    </div>
  );
};

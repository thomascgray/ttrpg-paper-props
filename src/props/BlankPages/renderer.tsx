import React from "react";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { PAPER_TYPES } from "../../config";

export const BlankPages = (
  props: typeof PAPER_TYPES["BLANK_PAGES"]["data"]
) => {
  return (
    <div className="relative">
      <img src="/images/blank-pages-png.png" alt="" />

      <p
        style={{
          top: "200px",
          left: "400px",
        }}
        className="absolute text-4xl font-bold"
      >
        this is some example text
      </p>
    </div>
  );
};

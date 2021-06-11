import React from "react";
import classNames from "classnames";
import Markdown from "markdown-to-jsx";
import { PAPER_TYPES } from "../../config";

export const RaggedJournalCover = (
  props: typeof PAPER_TYPES["RAGGED_JOURNAL_COVER"]["data"]
) => {
  return (
    <div
      style={{
        transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
      }}
      className="relative transition transform"
    >
      <img src="/images/ragged-journal-cover.png" alt="" />

      <div
        style={{
          top: "9%",
          left: "28%",
          width: "47%",
          height: "81%",
          mixBlendMode: "difference",
          textShadow: "-1px -1px 1px #fff, 1px 1px 1px #000",
        }}
        className="absolute p-12"
      >
        <Markdown
          className={`block prose ${props.prose_size} max-w-none text-center font-extrabold copy-colour-${props.copy_colour}`}
        >
          {props.main_copy}
        </Markdown>
      </div>
    </div>
  );
};

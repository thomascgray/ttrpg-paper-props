import React from "react";
import classNames from "classnames";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";

export const Ticket = (props: typeof PAPER_TYPES["TICKET"]["data"]) => {
  return (
    <div className="relative mx-auto flex justify-around">
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom}) translateZ(0)`,
          width: `${props.page_width}px`,
          height: `${props.page_height}px`,
          boxShadow: `${
            props.is_paper_shadow ? "inset 0 0 25px #000000" : "none"
          }`,
        }}
        className={`paper ${props.font} ${props.font_weight} absolute transition paper-${props.paper_texture} overflow-hidden transition transform mx-auto ${props.rounded_corners}`}
      >
        <div
          className={classNames("w-full h-full", {
            "p-8": props.sawtooth_border === "sawtooth-border-none",
            "px-8 py-10": props.sawtooth_border === "sawtooth-border-y",
            "px-10 py-8": props.sawtooth_border === "sawtooth-border-x",
          })}
        >
          <table className="table-fixed border-collapse w-full h-full border-none">
            <tbody>
              <tr>
                <td
                  rowSpan={3}
                  className={classNames(
                    "border border-gray-900 w-14 border-none text-center",
                    {
                      hidden: props.hide_left_margin_copy,
                    }
                  )}
                >
                  <span
                    style={{
                      writingMode: "vertical-lr",
                    }}
                    className="block transform rotate-180 ml-3 font-bold"
                  >
                    <Markdown className="copy-markdown">
                      {props.left_margin_copy}
                    </Markdown>
                  </span>
                </td>
                <td
                  colSpan={2}
                  className="border border-gray-900 prose border-none text-center"
                >
                  {!props.hide_top_content && (
                    <Markdown className="copy-markdown">
                      {props.top_copy}
                    </Markdown>
                  )}
                </td>
                <td
                  rowSpan={3}
                  className={classNames(
                    "border border-gray-900 w-14 border-none text-center",
                    {
                      hidden: props.hide_right_margin_copy,
                    }
                  )}
                >
                  <span
                    style={{
                      writingMode: "vertical-lr",
                    }}
                    className="block transform rotate-180 ml-3 font-bold"
                  >
                    <Markdown className="copy-markdown">
                      {props.right_margin_copy}
                    </Markdown>
                  </span>
                </td>
              </tr>
              <tr>
                {props.hide_middle_left_copy === false &&
                  props.hide_middle_right_copy === true && (
                    <td
                      colSpan={2}
                      className="border border-gray-900 prose border-none text-center"
                    >
                      <Markdown className="copy-markdown">
                        {props.middle_left_copy}
                      </Markdown>
                    </td>
                  )}
                {props.hide_middle_left_copy === true &&
                  props.hide_middle_right_copy === false && (
                    <td
                      colSpan={2}
                      className="border border-gray-900 prose border-none text-center"
                    >
                      <Markdown className="copy-markdown">
                        {props.middle_right_copy}
                      </Markdown>
                    </td>
                  )}
                {props.hide_middle_left_copy === false &&
                  props.hide_middle_right_copy === false && (
                    <React.Fragment>
                      <td className="border border-gray-900 prose border-none text-center">
                        <Markdown className="copy-markdown">
                          {props.middle_left_copy}
                        </Markdown>
                      </td>
                      <td className="border border-gray-900 prose border-none text-center">
                        <Markdown className="copy-markdown">
                          {props.middle_right_copy}
                        </Markdown>
                      </td>
                    </React.Fragment>
                  )}
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="border border-gray-900 prose border-none text-center"
                >
                  {!props.hide_botom_copy && (
                    <Markdown className="copy-markdown">
                      {props.botom_copy}
                    </Markdown>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom}) translateZ(0)`,
          width: `${props.page_width}px`,
          height: `${props.page_height}px`,
        }}
        className={classNames(
          `absolute ${props.sawtooth_border} pointer-events-none`
        )}
      ></div>
    </div>
  );
};

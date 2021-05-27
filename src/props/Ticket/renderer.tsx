import React from "react";
import classNames from "classnames";
import { PAPER_TYPES } from "../../config";

export const Ticket = (props: typeof PAPER_TYPES["TICKET"]["data"]) => {
  return (
    <div className="relative mx-auto flex justify-around">
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
          width: `${props.page_width}px`,
          height: `${props.page_height}px`,
        }}
        className={`paper absolute transition paper-${props.paper_texture} overflow-hidden transition transform mx-auto ${props.rounded_corners}`}
      >
        <div className="w-full h-full p-8">
          <table className="table-fixed border-collapse w-full h-full">
            <tr>
              <td
                rowSpan={3}
                className={classNames(
                  "border border-gray-900 border-double w-14",
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
                  {props.left_margin_copy}
                </span>
              </td>
              <td colSpan={2} className="border border-gray-900 border-double">
                XX 1
              </td>
              <td
                rowSpan={3}
                className={classNames(
                  "border border-gray-900 border-double w-14",
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
                  {props.right_margin_copy}
                </span>
              </td>
            </tr>
            <tr>
              <td className="border border-gray-900 border-double">XX 2</td>
              <td className="border border-gray-900 border-double">YY 2</td>
            </tr>
            <tr>
              <td colSpan={2} className="border border-gray-900 border-double">
                XX 3
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
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

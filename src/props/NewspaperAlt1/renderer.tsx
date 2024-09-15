import React from "react";
// @ts-ignore
import { Textfit } from "react-textfit";
import classNames from "classnames";
import Markdown from "react-markdown";
import { PAPER_TYPES } from "../../config";
import { iGridElement } from "../../components/GridBuilder";

// verison 1
{
  /* <div className="space-y-6">
          <div className="grid grid-cols-4 gap-6">
            <p>
              Curabitur a dolor quis risus convallis imperdiet vitae vel nunc.
              Cras at nunc venenatis, eleifend ligula non, aliquet tellus.
              Vivamus hendrerit eros ut sem cursus vehicula. Morbi non nibh
              odio. Etiam sit amet purus fringilla, auctor metus sit amet,
              finibus turpis. Vestibulum posuere urna vitae ante feugiat, ut
              suscipit ex dapibus. Etiam interdum arcu in nunc egestas tempus.
              Aenean dapibus ligula sapien, sit amet finibus nisl viverra in.
            </p>
            <p className="col-span-3 row-span-2">
              Pellentesque non risus velit. In hac habitasse platea dictumst.
              Mauris sagittis dapibus arcu id imperdiet. Curabitur imperdiet
              orci vitae ante vehicula faucibus. Integer id mi auctor, euismod
              turpis sit amet, aliquam massa. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Fusce malesuada venenatis sapien et
              porta. Duis iaculis elit eu lectus consectetur
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            <p className="col-span-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              venenatis enim sed odio varius, eget fermentum orci rhoncus. Cras
              ac ligula elit. Praesent in augue eros. Suspendisse rhoncus neque
              nec eros porttitor rutrum. Suspendisse luctus bibendum quam id
              dapibus. Fusce ornare congue arcu. Donec hendrerit mauris et
              interdum pretium. Fusce auctor eleifend velit, id condimentum
              augue tincidunt ut. In ornare, tortor ut volutpat bibendum, elit
              lacus sodales ligula, at pretium eros ligula non velit. Nulla
              feugiat sollicitudin odio, in rhoncus felis elementum eu.
            </p>
            <p className="col-span-2">
              Nunc rhoncus urna sed augue malesuada, nec cursus tortor
              condimentum. Cras vel venenatis velit. Proin tincidunt tellus quis
              aliquet viverra. Aenean rutrum tincidunt leo in suscipit. Aenean
              tempus magna turpis, sit amet sagittis lorem facilisis ut. Fusce
              ullamcorper congue lacus ac viverra. Curabitur non metus vel dolor
              vestibulum auctor. Phasellus ultrices magna eu iaculis porttitor.
              Integer ut ultrices metus. Sed sed nisl leo. Praesent
              sollicitudin, justo sit amet cursus varius, orci nulla sagittis
              elit, eu dignissim eros eros quis purus.
            </p>
            <p>
              Cras egestas interdum nisl, vulputate efficitur metus varius
              vitae. In vestibulum mauris lectus, eu imperdiet metus lobortis
              sit amet. Vivamus id posuere sapien, eu elementum quam. In ornare,
              augue non dictum porttitor, est lorem finibus augue, ac interdum
              augue sem sit amet massa. Sed vel augue finibus, ultrices odio et,
              mollis lectus. Aenean malesuada ex id pellentesque elementum. Sed
              lobortis dolor eget leo rutrum, in dignissim diam tincidunt.
              Aliquam sodales egestas nisl, ut convallis dui cursus at.
            </p>
          </div>
        </div>
         */
}
export const NewspaperAlt1 = (
  props: (typeof PAPER_TYPES)["NEWSPAPER_ALT"]["data"]
) => {
  return (
    <React.Fragment>
      <div
        style={{
          transform: `rotate(${props.rotation_degrees}deg) scale(${props.zoom})`,
          width: `${props.page_width_percentage}%`,
          boxShadow: `${
            props.is_paper_shadow ? "inset 0 0 25px #000000" : "none"
          }`,
          marginTop: `${props.y_offset}%`,
          marginLeft: `${props.x_offset}%`,
        }}
        className={`paper paper-${props.paper_texture} ${props.ink_color} p-10`}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${props.gridData.totalColumns}, minmax(0, 1fr))`,
            gap: `${props.gridData.gridGap}em`,
          }}
        >
          {props.gridData.elements.map((element, index) => {
            const el = element as iGridElement;
            return (
              <p
                style={{
                  gridColumn: `span ${el.colSpan} / span ${el.colSpan}`,
                  gridRow: `span ${el.rowSpan} / span ${el.rowSpan}`,
                }}
              >
                {el.content}
              </p>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

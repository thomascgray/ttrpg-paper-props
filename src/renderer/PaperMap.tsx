import { PaperMapConfig } from "../handoutConfigs";
import { Icon } from "../Icon";
import { ExtractConfigValues } from "../types";

type PaperMapData = ExtractConfigValues<typeof PaperMapConfig>;

const getLegendPositionStyles = (position: string): React.CSSProperties => {
  switch (position) {
    case "top-left":
      return { top: 0, left: 0 };
    case "top-center":
      return { top: 0, left: "50%", transform: "translateX(-50%)" };
    case "top-right":
      return { top: 0, right: 0 };
    case "middle-left":
      return { top: "50%", left: 0, transform: "translateY(-50%)" };
    case "middle-right":
      return { top: "50%", right: 0, transform: "translateY(-50%)" };
    case "bottom-left":
      return { bottom: 0, left: 0 };
    case "bottom-center":
      return { bottom: 0, left: "50%", transform: "translateX(-50%)" };
    case "bottom-right":
      return { bottom: 0, right: 0 };
    default:
      return { top: 0, left: 0 };
  }
};

export const PaperMap = ({ handout }: { handout: PaperMapData }) => {
  return (
    <>
      {/* the paper */}
      <div
        style={{
          width: "80%",
        }}
        className={`paper relative p-12 inline-block overflow-visible transition-all ${handout.legend.font} ${handout.legend.fontWeight} ${handout.imageFilter} paper-${handout.paperTexture}`}
      >
        <div className="relative">
          <img
            className="image block w-full"
            src={handout.image}
            style={
              {
                // mixBlendMode: "multiply",
              }
            }
          />

          {/* the legend items on the map */}
          {handout.legend.legendItems.map((item, index) => {
            const flexDirection = {
              above: "flex-col-reverse",
              below: "flex-col",
              left: "flex-row-reverse",
              right: "flex-row",
            }[item.textPosition];

            return (
              <div
                key={item.id}
                className={`absolute transition-all`}
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`flex drop-shadow-md items-center gap-1 ${flexDirection}`}
                >
                  <div className="flex items-center justify-center shadow-sm">
                    <Icon
                      name={item.icon}
                      size={item.iconSize}
                      colour={item.iconColor}
                    />
                  </div>
                  {item.showText && (
                    <span
                      style={{
                        fontSize: `${handout.legend.fontSize}px`,
                      }}
                      className="text-xs font-medium whitespace-nowrap rounded shadow-sm"
                    >
                      {item.text}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* the legend itself */}
          {handout.legend.legendItems.length > 0 && (
            <div
              className="legend absolute bg-white p-4 rounded shadow-lg grid grid-cols-1 gap-4"
              style={getLegendPositionStyles(handout.legend.legendPosition)}
            >
              {handout.legend.legendItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full flex items-center justify-center border border-gray-300 p-1">
                      <Icon name={item.icon} colour={item.iconColor} />
                    </div>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

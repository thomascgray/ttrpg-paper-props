import { PaperMapConfig } from "../handoutConfigs";
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
        className={`paper relative p-12 inline-block overflow-visible transition-all ${handout.font} ${handout.fontWeight} ${handout.imageFilter} paper-${handout.paperTexture}`}
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
          {handout.legendItems.map((item, index) => {
            const flexDirection = {
              above: "flex-col-reverse",
              below: "flex-col",
              left: "flex-row-reverse",
              right: "flex-row",
            }[item.textPosition];

            return (
              <div
                key={item.id}
                className={`absolute ${handout.inkColor} transition-all`}
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className={`flex items-center gap-1 ${flexDirection}`}>
                  <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {item.icon}
                  </span>
                  {item.showText && (
                    <span className="text-xs font-medium whitespace-nowrap bg-white p-1">
                      {item.text}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* the legend itself */}
          {handout.legendItems.length > 0 && (
            <div
              className="legend absolute bg-white p-4 rounded shadow-lg"
              style={getLegendPositionStyles(handout.legendPosition)}
            >
              {handout.legendItems.map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center gap-4">
                    <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold border border-gray-300">
                      {item.icon}
                    </span>
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

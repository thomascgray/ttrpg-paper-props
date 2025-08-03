import classNames from "classnames";
import type { TestConfig } from "../handoutConfigs";
import { Bulges } from "../svg_effects/Bulge";
import { ExtractConfigValues } from "../types";
import { detectBrowser } from "../utils";

type TestData = ExtractConfigValues<typeof TestConfig>;

interface TestProps {
  data: TestData;
}

export function Test({ data }: TestProps) {
  const { positioning } = data;
  const { rotation, zoom, xOffset, yOffset } = positioning;

  const browser = detectBrowser();
  console.log("browser", browser);
  return (
    <>
      <Bulges scale={data.scale} />
      {/* <div className="flex gap-[100px]">
        <div
          className="bulge-inner-circle"
          style={{
            width: "200px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className="bulge-inner-circle"
          style={{
            width: "300px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className="bulge-inner-circle"
          style={{
            width: "200px",
            height: "300px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
      </div>

      <div className="mt-10 flex gap-[100px]">
        <div
          className="bulge-inner-circle-16-9"
          style={{
            width: "200px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className="bulge-inner-circle-16-9"
          style={{
            width: "300px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className="bulge-inner-circle-16-9"
          style={{
            width: "200px",
            height: "300px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
      </div>

      <div className="mt-[100px] flex gap-[100px]">
        <div
          className={classNames("bulge-whole-element", {
            "-skew-x-[2deg]": browser === "chrome",
          })}
          style={{
            width: "200px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className={classNames("bulge-whole-element", {
            "-skew-x-[2deg]": browser === "chrome",
          })}
          style={{
            width: "300px",
            height: "200px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
        <div
          className={classNames("bulge-whole-element", {
            "-skew-x-[2deg]": browser === "chrome",
          })}
          style={{
            width: "200px",
            height: "300px",
            backgroundSize: "cover",
            backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
          }}
        ></div>
      </div> */}

      <div className="mt-[200px] flex gap-[100px]">
        <div
          style={{
            transform: "rotateX(20deg)",
          }}
        >
          <div
            className={classNames("bulge-whole-element", {})}
            style={{
              width: "200px",
              height: "200px",
              backgroundSize: "cover",
              backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Checkerboard_pattern.svg/2048px-Checkerboard_pattern.svg.png)`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

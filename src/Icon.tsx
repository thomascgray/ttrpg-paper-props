import classNames from "classnames";

export const iconNames = [
  "square",
  "circle", 
  "triangle",
  "triangle-inverted",
  "pentagon",
  "hexagon",
  "map-pin",
  "pin",
  "pinned",
  "flag",
  "flag-2",
  "flag-3"
] as const;

export type IconName = typeof iconNames[number];

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

const iconSizeClasses: Record<IconSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4", 
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
};

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  colour?: string; // a hex value of a colour
}

export const Icon = (props: IconProps) => {
  const size = props.size || "md";
  const sizeClasses = iconSizeClasses[size];
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={classNames(
        "icon icon-tabler icons-tabler-filled icon-tabler-square",
        sizeClasses,
        props.className
      )}
      style={{
        fill: props.colour,
      }}
    >
      {props.name === "square" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 2h-14a3 3 0 0 0 -3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3 -3v-14a3 3 0 0 0 -3 -3z" />
        </>
      )}
      {props.name === "triangle" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z" />
        </>
      )}
      {props.name === "triangle-inverted" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20.118 3h-16.225a2.914 2.914 0 0 0 -2.503 4.371l8.116 13.549a2.917 2.917 0 0 0 4.987 .005l8.11 -13.539a2.914 2.914 0 0 0 -2.486 -4.386z" />
        </>
      )}
      {props.name === "circle" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z" />
        </>
      )}
      {props.name === "hexagon" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.425 1.414l-6.775 3.996a3.21 3.21 0 0 0 -1.65 2.807v7.285a3.226 3.226 0 0 0 1.678 2.826l6.695 4.237c1.034 .57 2.22 .57 3.2 .032l6.804 -4.302c.98 -.537 1.623 -1.618 1.623 -2.793v-7.284l-.005 -.204a3.223 3.223 0 0 0 -1.284 -2.39l-.107 -.075l-.007 -.007a1.074 1.074 0 0 0 -.181 -.133l-6.776 -3.995a3.33 3.33 0 0 0 -3.216 0z" />
        </>
      )}
      {props.name === "pentagon" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10.205 2.6l-6.96 5.238a3 3 0 0 0 -1.045 3.338l2.896 8.765a3 3 0 0 0 2.85 2.059h8.12a3 3 0 0 0 2.841 -2.037l2.973 -8.764a3 3 0 0 0 -1.05 -3.37l-7.033 -5.237l-.091 -.061l-.018 -.01l-.106 -.07a3 3 0 0 0 -3.377 .148z" />
        </>
      )}
      {props.name === "map-pin" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
        </>
      )}
      {props.name === "pin" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15.113 3.21l.094 .083l5.5 5.5a1 1 0 0 1 -1.175 1.59l-3.172 3.171l-1.424 3.797a1 1 0 0 1 -.158 .277l-.07 .08l-1.5 1.5a1 1 0 0 1 -1.32 .082l-.095 -.083l-2.793 -2.792l-3.793 3.792a1 1 0 0 1 -1.497 -1.32l.083 -.094l3.792 -3.793l-2.792 -2.793a1 1 0 0 1 -.083 -1.32l.083 -.094l1.5 -1.5a1 1 0 0 1 .258 -.187l.098 -.042l3.796 -1.425l3.171 -3.17a1 1 0 0 1 1.497 -1.26z" />
        </>
      )}
      {props.name === "pinned" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
        </>
      )}
      {props.name === "flag" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 5a1 1 0 0 1 .3 -.714a6 6 0 0 1 8.213 -.176l.351 .328a4 4 0 0 0 5.272 0l.249 -.227c.61 -.483 1.527 -.097 1.61 .676l.005 .113v9a1 1 0 0 1 -.3 .714a6 6 0 0 1 -8.213 .176l-.351 -.328a4 4 0 0 0 -5.136 -.114v6.552a1 1 0 0 1 -1.993 .117l-.007 -.117v-16z" />
        </>
      )}
      {props.name === "flag-2" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 4a1 1 0 0 1 .993 .883l.007 .117v9a1 1 0 0 1 -.883 .993l-.117 .007h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z" />
        </>
      )}
      {props.name === "flag-3" && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 4c.852 0 1.297 .986 .783 1.623l-.076 .084l-3.792 3.793l3.792 3.793c.603 .602 .22 1.614 -.593 1.701l-.114 .006h-13v6a1 1 0 0 1 -.883 .993l-.117 .007a1 1 0 0 1 -.993 -.883l-.007 -.117v-16a1 1 0 0 1 .883 -.993l.117 -.007h14z" />
        </>
      )}
    </svg>
  );
};

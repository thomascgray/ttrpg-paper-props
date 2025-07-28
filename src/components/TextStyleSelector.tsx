import React from "react";

interface TextStyleSelectorProps {
  label: string;
  value: string;
  onUpdate: (value: string) => void;
}

interface StyleState {
  bold: boolean;
  italic: boolean;
  uppercase: boolean;
  underline: boolean;
  strikethrough: boolean;
}

const parseStyleString = (styleString: string): StyleState => {
  const styles = styleString.split(" ").filter(Boolean);
  return {
    bold: styles.includes("text-bold"),
    italic: styles.includes("text-italic"),
    uppercase: styles.includes("text-uppercase"),
    underline: styles.includes("text-underline"),
    strikethrough: styles.includes("text-strikethrough"),
  };
};

const buildStyleString = (state: StyleState): string => {
  const classes: string[] = [];
  if (state.bold) classes.push("text-bold");
  if (state.italic) classes.push("text-italic");
  if (state.uppercase) classes.push("text-uppercase");
  if (state.underline) classes.push("text-underline");
  if (state.strikethrough) classes.push("text-strikethrough");
  return classes.join(" ");
};

export const TextStyleSelector = (props: TextStyleSelectorProps) => {
  const currentState = parseStyleString(props.value || "");

  const toggleStyle = (style: keyof StyleState) => {
    const newState = { ...currentState, [style]: !currentState[style] };
    props.onUpdate(buildStyleString(newState));
  };

  const styleButtons = [
    { key: "bold" as const, label: "B", className: "font-bold" },
    { key: "italic" as const, label: "I", className: "italic" },
    { key: "uppercase" as const, label: "AA", className: "uppercase text-xs" },
    { key: "underline" as const, label: "U", className: "underline" },
    { key: "strikethrough" as const, label: "S", className: "line-through" },
  ];

  return (
    <label className="block">
      <span className="block mb-1 text-sm">{props.label}</span>
      <div className="flex gap-1">
        {styleButtons.map(({ key, label, className }) => (
          <button
            key={key}
            type="button"
            onClick={() => toggleStyle(key)}
            className={`px-3 py-1 border rounded transition-colors ${
              currentState[key]
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
            } ${className}`}
          >
            {label}
          </button>
        ))}
      </div>
    </label>
  );
};
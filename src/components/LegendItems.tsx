import React from "react";
import { nanoid } from "nanoid";
import { TextInput } from "./TextInput";
import { RangeInput } from "./RangeInput";
import { CheckboxInput } from "./CheckboxInput";
import { Select } from "./Select";
import { IconPicker } from "./IconPicker";
import { IconName, IconSize } from "../Icon";
import { ColourPicker } from "./ColourPicker";

export interface LegendItem {
  id: string;
  text: string;
  icon: IconName;
  iconSize: IconSize;
  position: {
    x: number;
    y: number;
  };
  iconColor: string;
  showText: boolean;
  textPosition: "above" | "below" | "left" | "right";
}

interface LegendItemsProps {
  label: string;
  value: LegendItem[];
  onUpdate: (value: LegendItem[]) => void;
}

export const LegendItems: React.FC<LegendItemsProps> = ({
  label,
  value,
  onUpdate,
}) => {
  const addLegendItem = () => {
    const newItem: LegendItem = {
      id: nanoid(),
      text: "",
      icon: "square",
      iconSize: "md",
      position: {
        x: 50,
        y: 50,
      },
      showText: false,
      iconColor: "#FFFFFF",
      textPosition: "right",
    };
    onUpdate([...value, newItem]);
  };

  const deleteLegendItem = (id: string) => {
    onUpdate(value.filter((item) => item.id !== id));
  };

  const updateLegendItem = (id: string, field: string, newValue: any) => {
    onUpdate(
      value.map((item) => {
        if (item.id === id) {
          if (field === "text") {
            return { ...item, text: newValue };
          } else if (field === "icon") {
            return { ...item, icon: newValue };
          } else if (field === "showText") {
            return { ...item, showText: newValue };
          } else if (field === "textPosition") {
            return { ...item, textPosition: newValue };
          } else if (field === "iconColor") {
            return { ...item, iconColor: newValue };
          } else if (field === "iconSize") {
            return { ...item, iconSize: newValue };
          } else if (field === "x" || field === "y") {
            return {
              ...item,
              position: {
                ...item.position,
                [field]: parseInt(newValue, 10),
              },
            };
          }
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{label}</h3>

      {(value || []).map((item, index) => (
        <div key={item.id} className="bg-gray-100 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-md">Legend Item {index + 1}</h4>
            <button
              onClick={() => deleteLegendItem(item.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>

          <TextInput
            label="Legend Text"
            value={item.text}
            onUpdate={(val) => updateLegendItem(item.id, "text", val)}
          />

          <IconPicker
            label="Icon"
            value={item.icon}
            onUpdate={(val) => updateLegendItem(item.id, "icon", val)}
          />

          <ColourPicker
            label="Icon Colour"
            value={item.iconColor}
            onUpdate={(val) => updateLegendItem(item.id, "iconColor", val)}
          />

          <Select
            label="Icon Size"
            value={item.iconSize}
            onUpdate={(val) => updateLegendItem(item.id, "iconSize", val)}
            options={[
              { value: "xs", label: "X-Small" },
              { value: "sm", label: "Small" },
              { value: "md", label: "Medium" },
              { value: "lg", label: "Large" },
              { value: "xl", label: "X-Large" },
            ]}
          />

          <RangeInput
            label="X Position"
            value={item.position.x.toString()}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onUpdate={(val) => updateLegendItem(item.id, "x", val)}
          />

          <RangeInput
            label="Y Position"
            value={item.position.y.toString()}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onUpdate={(val) => updateLegendItem(item.id, "y", val)}
          />

          <CheckboxInput
            label="Show Text on Map"
            value={item.showText}
            onUpdate={(val) => updateLegendItem(item.id, "showText", val)}
          />

          {item.showText && (
            <Select
              label="Text Position"
              value={item.textPosition}
              onUpdate={(val) => updateLegendItem(item.id, "textPosition", val)}
              options={[
                { value: "above", label: "Above" },
                { value: "below", label: "Below" },
                { value: "left", label: "Left" },
                { value: "right", label: "Right" },
              ]}
            />
          )}
        </div>
      ))}

      <button
        onClick={addLegendItem}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Legend Item
      </button>
    </div>
  );
};

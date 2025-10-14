import React from "react";
import { nanoid } from "nanoid";
import { TextArea } from "./TextArea";
import { FontSelector } from "./FontSelector";
import { RangeInput } from "./RangeInput";
import { FontWeightSelector } from "./FontWeightSelector";
import { TextAlignmentSelector } from "./TextAlignmentSelector";
import { FontFamily } from "../enums";

interface Paragraph {
  id: string;
  mainCopy: string;
  font: FontFamily;
  fontSize: number;
  fontWeight: string;
  textAlign: string;
}

interface ParagraphArrayProps {
  label: string;
  value: Paragraph[];
  onUpdate: (value: Paragraph[]) => void;
}

export const ParagraphArray: React.FC<ParagraphArrayProps> = ({
  label,
  value,
  onUpdate,
}) => {
  const addParagraph = () => {
    const newParagraph: Paragraph = {
      id: nanoid(),
      mainCopy: "",
      font: FontFamily.SERIF,
      fontSize: 1.4,
      fontWeight: "font-normal",
      textAlign: "text-left",
    };
    onUpdate([...value, newParagraph]);
  };

  const deleteParagraph = (id: string) => {
    onUpdate(value.filter((p) => p.id !== id));
  };

  const updateParagraph = (id: string, field: string, newValue: any) => {
    onUpdate(value.map((p) => (p.id === id ? { ...p, [field]: newValue } : p)));
  };

  console.log("value", value);
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{label}</h3>

      {(value || []).map((paragraph, index) => (
        <div
          key={paragraph.id}
          className="bg-gray-100 p-4 rounded-lg space-y-3"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-md">Paragraph {index + 1}</h4>
            <button
              onClick={() => deleteParagraph(paragraph.id)}
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

          <TextArea
            label="Main Copy"
            value={paragraph.mainCopy}
            autoResize={true}
            onUpdate={(val) => updateParagraph(paragraph.id, "mainCopy", val)}
          />

          <FontSelector
            label="Font"
            value={paragraph.font}
            onUpdate={(val) => updateParagraph(paragraph.id, "font", val)}
          />

          <RangeInput
            label="Font Size"
            value={paragraph.fontSize.toString()}
            min={0.5}
            max={6}
            step={0.1}
            suffix="cqw"
            onUpdate={(val) => updateParagraph(paragraph.id, "fontSize", val)}
          />

          <FontWeightSelector
            label="Font Weight"
            value={paragraph.fontWeight}
            onUpdate={(val) => updateParagraph(paragraph.id, "fontWeight", val)}
          />

          <TextAlignmentSelector
            label="Text Align"
            value={paragraph.textAlign}
            onUpdate={(val) => updateParagraph(paragraph.id, "textAlign", val)}
          />
        </div>
      ))}

      <button
        onClick={addParagraph}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Paragraph
      </button>
    </div>
  );
};

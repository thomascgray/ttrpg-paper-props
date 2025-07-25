import { FontWeight } from "../enums";

interface iFontWeightSelector {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
}

export const FontWeightSelector = (props: iFontWeightSelector) => {
  return (
    <label className="block">
      <span className="block mb-1">{props.label}</span>
      <div className="flex">
        <select
          value={props.value}
          className={`p-2 text-lg w-full`}
          onChange={(e) => {
            props.onUpdate(e.target.value);
          }}
        >
          <option value={FontWeight.LIGHT}>Light</option>
          <option value={FontWeight.NORMAL}>Normal</option>
          <option value={FontWeight.SEMI_BOLD}>Semi-Bold</option>
          <option value={FontWeight.BOLD}>Bold</option>
        </select>
      </div>
    </label>
  );
};

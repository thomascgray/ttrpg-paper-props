import classnames from "classnames";
import { Icon, IconName, iconNames } from "../Icon";

interface IconPickerProps {
  label: string;
  value: IconName;
  onUpdate: (value: IconName) => void;
}

export const IconPicker = (props: IconPickerProps) => {
  return (
    <label className="block">
      <span className="block mb-2">🎯 {props.label}</span>
      <div className="grid grid-cols-5 gap-2">
        {iconNames.map((iconName) => {
          return (
            <button
              key={iconName}
              type="button"
              className={classnames(
                "h-12 w-12 bg-gray-200 flex items-center justify-center",
                { "outline-red-400 outline": props.value === iconName }
              )}
              onClick={() => {
                props.onUpdate(iconName);
              }}
            >
              <Icon name={iconName} className="w-6 h-6" />
            </button>
          );
        })}
      </div>
    </label>
  );
};

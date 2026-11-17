import { useId } from "react";

interface iRadioGroup {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
}

export const RadioGroup = (props: iRadioGroup) => {
  // Each group needs its own name, or two radio inputs on the page would
  // share one selection
  const name = useId();

  return (
    <fieldset className="block">
      <legend className="block mb-1">{props.label}</legend>
      <div className="flex flex-col gap-2">
        {props.options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={props.value === option.value}
              onChange={() => props.onUpdate(option.value)}
              className="mt-1.5"
            />
            <span>
              <span className="block text-lg">{option.label}</span>
              {option.description && (
                <span className="block text-sm text-gray-700">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

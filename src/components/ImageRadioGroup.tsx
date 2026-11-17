import classNames from "classnames";

interface iImageRadioGroup {
  label: string;
  value: string;
  onUpdate: (value: any) => void;
  options: {
    value: string;
    label: string;
    // Falls back to the value, since most of these options are image paths
    image?: string;
  }[];
}

export const ImageRadioGroup = (props: iImageRadioGroup) => {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="block mb-2">{props.label}</legend>

      <div
        role="radiogroup"
        className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        {props.options.map((option) => {
          const selected = props.value === option.value;
          return (
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              key={option.value}
              title={option.label}
              onClick={() => props.onUpdate(option.value)}
              className={classNames(
                "w-full flex flex-col items-center gap-1 p-2 bg-white/60 border border-solid border-slate-400 shadow-md outline",
                {
                  "outline-red-400": selected,
                  "outline-none": !selected,
                },
              )}
            >
              <img
                src={option.image ?? option.value}
                alt=""
                loading="lazy"
                className="w-full h-24 object-contain"
              />
              <span className="text-sm italic text-center leading-tight">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

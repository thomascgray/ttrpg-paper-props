import { Button, Group, Text, Collapse, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classNames from "classnames";

interface iPaperTextureSelect {
  value: string;
  onUpdate: (value: any) => void;
}

const paperTextures = [
  "none",
  "grey",
  "white",
  "beige",
  "beige-2",
  "beige-3",
  "cream",
  "cream-2",
  "stained",
];

export const PaperTextureSelect = (props: iPaperTextureSelect) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <div className="flex flex-col gap-2">
      <span className="block">Paper Texture</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paperTextures.map((texture) => (
          <button
            onClick={() => {
              props.onUpdate(texture);
            }}
            key={texture}
            className={classNames(
              `w-full h-20 border border-solid border-slate-400 shadow-md paper paper-${texture} flex items-center justify-center outline`,
              {
                "outline-red-400": props.value === texture,
                "outline-none": props.value !== texture,
              }
            )}
          >
            <span className="capitalize italic">{texture}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

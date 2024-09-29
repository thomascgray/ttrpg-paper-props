import React, { useContext } from "react";
import { StateContext } from "../context";

interface iFormDetailsProps {
  title: string;
  description?: string;
  for?: string;
  children: React.ReactNode;
}

export const FormDetails = (props: iFormDetailsProps) => {
  const { title, description, children } = props;
  const stateContext = useContext(StateContext);

  return (
    <details
      className="bg-gray-400 space-y-4 p-2"
      onMouseEnter={() => {
        if (props.for) {
          stateContext.setHighlighted(props.for);
        }
      }}
      onMouseLeave={() => {
        if (props.for) {
          stateContext.setHighlighted("");
        }
      }}
    >
      <summary className="cursor-pointer">
        <span className="font-bold">{title}</span>
        <span className="text-xs ml-3">{description ? description : ""}</span>
      </summary>
      {children}
    </details>
  );
};

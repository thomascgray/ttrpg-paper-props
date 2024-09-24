import { createContext } from "react";

export const StateContext = createContext({
  onChange: (key: string, value: any) => {},
  highlighted: "",
  setHighlighted: (val: string) => {},
});

import { createContext } from "react";

export const StateContext = createContext({
  onChange: (key: string, value: any, shouldSpread: boolean = false) => {},
  highlighted: "",
  setHighlighted: (val: string) => {},
});

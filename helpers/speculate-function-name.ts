import { VERSION } from "remotion/version";
import { DISK, RAM, TIMEOUT } from "../config.mjs";

export const speculateFunctionName = () => {
  return `remotion-render-${VERSION.replace(
    /\./g,
    "-"
  )}-mem${RAM}mb-disk${DISK}mb-${TIMEOUT}sec`;
};

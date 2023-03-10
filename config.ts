// TODO: same name as in Remix template

import { VERSION } from "remotion/version";

// TODO: Validate is is set
export const serveUrl = process.env.REMOTION_AWS_SERVE_URL;
export const region = process.env.REMOTION_AWS_REGION;

export const config = {
  serveUrl,
  region,
};

export const RAM = 2048;
export const DISK = 2048;
export const TIMEOUT = 240;

export const speculateFunctionName = () => {
  return `remotion-render-${VERSION.replace(
    /\./g,
    "-"
  )}-mem${RAM}mb-disk${DISK}mb-${TIMEOUT}sec`;
};

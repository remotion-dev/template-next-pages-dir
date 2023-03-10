// TODO: same name as in Remix template
// TODO: Validate is is set
export const serveUrl = process.env.REMOTION_AWS_SERVE_URL;
export const region = process.env.REMOTION_AWS_REGION;
export const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;

export const config = {
  serveUrl,
  region,
  functionName,
};

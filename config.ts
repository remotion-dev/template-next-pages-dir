// TODO: same name as in Remix template

export const serveUrl = process.env.REMOTION_SERVE_URL;
export const region = process.env.REMOTION_REGION;
export const functionName = process.env.REMOTION_FUNCTION_NAME;
export const bucketName = process.env.REMOTION_BUCKET;

export const config = {
  serveUrl,
  region,
  functionName,
  bucketName,
};

import { RenderMediaOnLambdaOutput } from "@remotion/lambda";

export const postMedia = async (
  id: string,
  inputProps: unknown
): Promise<RenderMediaOnLambdaOutput> => {
  const result = await fetch(`/api/lambda/media`, {
    method: "post",
    body: JSON.stringify({ id, inputProps }),
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await result.json();
  return json;
};

import { RenderStillOnLambdaOutput } from "@remotion/lambda";

export const postStill = async (
  id: string,
  inputProps: unknown
): Promise<RenderStillOnLambdaOutput> => {
  const result = await fetch(`/api/lambda/still`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ id, inputProps }),
  });

  const json = await result.json();

  return json;
};

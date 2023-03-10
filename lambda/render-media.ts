import { z } from "zod";
import { RenderMediaOnLambdaOutput } from "@remotion/lambda";
import { RenderRequest } from "../types/schema";
import { CompositionProps } from "../types/constants";

export const renderVideo = async (
  id: string,
  inputProps: z.infer<typeof CompositionProps>
): Promise<RenderMediaOnLambdaOutput> => {
  const body: z.infer<typeof RenderRequest> = {
    id,
    inputProps,
  };

  const result = await fetch(`/api/lambda/render`, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });

  const json = await result.json();
  return json;
};

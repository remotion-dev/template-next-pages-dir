import { z } from "zod";
import { RenderMediaOnLambdaOutput } from "@remotion/lambda";
import { RenderRequest } from "../types/schema";
import { CompositionProps } from "../types/constants";
import { makeRequest } from "./make-request";

export const renderVideo = async (
  id: string,
  inputProps: z.infer<typeof CompositionProps>
) => {
  const body: z.infer<typeof RenderRequest> = {
    id,
    inputProps,
  };

  return makeRequest<RenderMediaOnLambdaOutput>("/api/lambda/render", body);
};

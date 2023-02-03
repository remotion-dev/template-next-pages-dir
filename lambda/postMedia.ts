import { RenderMediaOnLambdaOutput } from "@remotion/lambda";
import axios from "axios";

export const postMedia = async (
  id: string,
  inputProps: any
): Promise<RenderMediaOnLambdaOutput | null> => {
  const result = await axios.post(`/api/lambda/media`, { id, inputProps });
  return result.data;
};

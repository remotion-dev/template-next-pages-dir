import { RenderProgress } from "@remotion/lambda";
import axios from "axios";

export const getProgress = async (id: string): Promise<RenderProgress> => {
  const result = await axios.get(`/api/lambda/progress`, { params: { id } });
  return result.data;
};

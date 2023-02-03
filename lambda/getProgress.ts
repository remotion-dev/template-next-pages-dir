import { RenderProgress } from "@remotion/lambda";

export const getProgress = async (id: string): Promise<RenderProgress> => {
  const result = await fetch(`/api/lambda/progress`, {
    body: JSON.stringify({ params: { id } }),
    headers: {
      "content-type": "application/json",
    },
  });

  return result.json();
};

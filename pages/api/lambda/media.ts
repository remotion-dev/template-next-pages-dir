import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda";
import { renderMediaOnLambda } from "@remotion/lambda/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../config";

export default async function media(
  req: NextApiRequest,
  res: NextApiResponse<RenderMediaOnLambdaOutput>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // TODO: validate
  const result = await renderMediaOnLambda({
    codec: "h264",
    functionName: config.functionName as string,
    region: config.region as AwsRegion,
    serveUrl: config.serveUrl as string,
    composition: req.body.id,
    inputProps: req.body.inputProps,
  });

  res.status(200).json(result);
}

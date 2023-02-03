import { AwsRegion, RenderStillOnLambdaOutput } from "@remotion/lambda";
import { renderStillOnLambda } from "@remotion/lambda/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../../config";

export default async function still(
  req: NextApiRequest,
  res: NextApiResponse<RenderStillOnLambdaOutput>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const result = await renderStillOnLambda({
    functionName: config.functionName as string,
    region: config.region as AwsRegion,
    serveUrl: config.serveUrl as string,
    imageFormat: "jpeg",
    privacy: "public",
    composition: req.body.id,
    inputProps: req.body.inputProps,
  });

  res.status(200).json(result);
}

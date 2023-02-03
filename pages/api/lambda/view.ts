// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AwsRegion, getRenderProgress, RenderProgress } from "@remotion/lambda";
import type { NextApiRequest, NextApiResponse } from "next";
import { bucketName, config } from "../../../config";

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  // TODO: validate
  const result = await getRenderProgress({
    bucketName: bucketName as string,
    functionName: config.functionName as string,
    region: config.region as AwsRegion,
    renderId: req.query.id as string,
  });

  res.status(200).json(result);
}

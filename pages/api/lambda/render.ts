import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda";
import { renderMediaOnLambda } from "@remotion/lambda/client";
import { REGION, SITE_NAME } from "../../../config.mjs";
import { executeApi } from "../../../helpers/api-response";
import { speculateFunctionName } from "../../../helpers/speculate-function-name";
import { RenderRequest } from "../../../types/schema";

const render = executeApi<RenderMediaOnLambdaOutput, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {
    if (req.method !== "POST") {
      throw new Error("Only POST requests are allowed");
    }

    const result = await renderMediaOnLambda({
      codec: "h264",
      functionName: speculateFunctionName(),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: body.id,
      inputProps: body.inputProps,
    });

    return result;
  }
);

export default render;

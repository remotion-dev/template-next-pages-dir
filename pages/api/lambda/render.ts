import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda";
import { renderMediaOnLambda } from "@remotion/lambda/client";
import { config, speculateFunctionName } from "../../../config";
import { executeApi } from "../../../helpers/api-response";
import { RenderRequest } from "../../../types/schema";

const render = executeApi<RenderMediaOnLambdaOutput>(
  RenderRequest,
  async (req) => {
    if (req.method !== "POST") {
      throw new Error("Only POST requests are allowed");
    }

    const body = RenderRequest.parse(req.body);

    const result = await renderMediaOnLambda({
      codec: "h264",
      functionName: speculateFunctionName(),
      region: config.region as AwsRegion,
      serveUrl: config.serveUrl as string,
      composition: body.id,
      inputProps: body.inputProps,
    });

    return result;
  }
);

export default render;

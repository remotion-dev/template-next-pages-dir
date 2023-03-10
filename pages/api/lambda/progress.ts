import { AwsRegion, getRenderProgress } from "@remotion/lambda";
import { config, speculateFunctionName } from "../../../config";
import { executeApi } from "../../../helpers/api-response";
import { ProgressRequest, ProgressResponse } from "../../../types/schema";

const progress = executeApi<ProgressResponse, typeof ProgressRequest>(
  ProgressRequest,
  async (req, body) => {
    if (req.method !== "POST") {
      throw new Error("Only POST requests are allowed");
    }

    // TODO: Validate
    const renderProgress = await getRenderProgress({
      bucketName: body.bucketName,
      functionName: speculateFunctionName(),
      region: config.region as AwsRegion,
      renderId: body.id,
    });

    if (renderProgress.fatalErrorEncountered) {
      return {
        type: "error",
        message: renderProgress.errors[0].message,
      };
    }

    return {
      type: "unknown",
    };
  }
);

export default progress;

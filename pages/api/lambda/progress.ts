import { AwsRegion, getRenderProgress } from "@remotion/lambda";
import { REGION } from "../../../config";
import { executeApi } from "../../../helpers/api-response";
import { speculateFunctionName } from "../../../helpers/speculate-function-name.js";
import { ProgressRequest, ProgressResponse } from "../../../types/schema";

const progress = executeApi<ProgressResponse, typeof ProgressRequest>(
  ProgressRequest,
  async (req, body) => {
    if (req.method !== "POST") {
      throw new Error("Only POST requests are allowed");
    }

    const renderProgress = await getRenderProgress({
      bucketName: body.bucketName,
      functionName: speculateFunctionName(),
      region: REGION as AwsRegion,
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

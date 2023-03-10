import { deployFunction } from "@remotion/lambda";
import dotenv from "dotenv";
import { RAM, REGION, TIMEOUT } from "./config.mjs";

dotenv.config();

await deployFunction({
  architecture: "arm64",
  createCloudWatchLogGroup: true,
  memorySizeInMb: RAM,
  region: REGION,
  timeoutInSeconds: TIMEOUT,
});

console.log("Function deployed");

import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
} from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { RAM, REGION, SITE_NAME, TIMEOUT } from "./config.mjs";

dotenv.config();

await deployFunction({
  createCloudWatchLogGroup: true,
  memorySizeInMb: RAM,
  region: REGION,
  timeoutInSeconds: TIMEOUT,
  architecture: "arm64",
});
console.log("Function ensured");

const { bucketName } = await getOrCreateBucket({
  region: REGION,
});
console.log("Bucket ensured");
await deploySite({
  bucketName,
  entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
  siteName: SITE_NAME,
  region: REGION,
});

console.log("Site ensured");

import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
} from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { RAM, REGION, SITE_NAME, TIMEOUT } from "./config.mjs";

process.stdout.write("Deploying Lambda function... ");

dotenv.config();

const { alreadyExisted, functionName } = await deployFunction({
  createCloudWatchLogGroup: true,
  memorySizeInMb: RAM,
  region: REGION,
  timeoutInSeconds: TIMEOUT,
  architecture: "arm64",
});
console.log(functionName, alreadyExisted ? "(already existed)" : "(created)");

// TODO: Report if already existed: https://github.com/remotion-dev/remotion/pull/1936
process.stdout.write("Ensuring bucket... ");
const { bucketName } = await getOrCreateBucket({
  region: REGION,
});
console.log(bucketName);

process.stdout.write("Deploying site... ");
const { siteName } = await deploySite({
  bucketName,
  entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
  siteName: SITE_NAME,
  region: REGION,
});

console.log(siteName);

console.log();
console.log("You now have everything you need to render videos!");
console.log("Re-run this command when:");
console.log("  1) you changed the video template");
console.log("  2) you upgraded Remotion to a newer version");

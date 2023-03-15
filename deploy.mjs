import {
  deployFunction,
  deploySite,
  getOrCreateBucket,
} from "@remotion/lambda";
import dotenv from "dotenv";
import path from "path";
import { RAM, REGION, SITE_NAME, TIMEOUT } from "./config.mjs";

console.log("Selected region:", REGION);
dotenv.config();

// TODO: Make Next.JS specific setup
if (!process.env.AWS_ACCESS_KEY_ID && !process.env.REMOTION_AWS_ACCESS_KEY_ID) {
  console.log(
    'The environment variable "REMOTION_AWS_ACCESS_KEY_ID" is not yet.'
  );
  console.log(
    "Complete the Lambda setup: at https://www.remotion.dev/docs/lambda/setup"
  );
  process.exit(1);
}
if (
  !process.env.AWS_SECRET_ACCESS_KEY &&
  !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
) {
  console.log(
    'The environment variable "REMOTION_REMOTION_AWS_SECRET_ACCESS_KEY" is not yet.'
  );
  console.log(
    "Complete the Lambda setup: at https://www.remotion.dev/docs/lambda/setup"
  );
  process.exit(1);
}

process.stdout.write("Deploying Lambda function... ");

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

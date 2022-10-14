export const serveUrl = process.env.REMOTION_SERVE_URL || ""
export const region = process.env.REMOTION_REGION as any
export const functionName = process.env.REMOTION_FUNCTION_NAME || ""
export const privacy = "public" as any
export const imageFormat = "jpeg" as any
export const codec = "h264" as any
export const maxRetries = 2
export const bucketName = process.env.REMOTION_BUCKET || ""

export const config = {
    serveUrl,
    region,
    functionName,
    privacy,
    imageFormat,
    codec,
    maxRetries,
    bucketName
}
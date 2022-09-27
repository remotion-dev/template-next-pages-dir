import { RenderStillOnLambdaOutput } from "@remotion/lambda";
import axios from "axios";

export const postStill = async (id: string, inputProps: any): Promise<RenderStillOnLambdaOutput | null> => {
    try {
        const result = await axios.post(`/api/lambda/still`, { id, inputProps });
        return result.data;
    }
    catch {
        return null
    }
}
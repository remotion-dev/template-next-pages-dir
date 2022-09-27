import { RenderProgress } from "@remotion/lambda";
import axios from "axios";

export const getProgress = async (id: string): Promise<RenderProgress | null> => {
    try {
        const result = await axios.get(`/api/lambda/progress`, { params: { id } });
        return result.data;
    }
    catch {
        return null
    }
}
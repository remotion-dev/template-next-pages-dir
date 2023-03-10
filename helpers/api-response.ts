import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export type ApiResponse<Res> =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      data: Res;
    };

export const executeApi =
  <Res>(
    schema: z.AnyZodObject,
    handler: (
      req: NextApiRequest,
      res: NextApiResponse<ApiResponse<Res>>
    ) => Promise<Res>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse<ApiResponse<Res>>) => {
    try {
      schema.parse(req.body);
      const data = await handler(req, res);
      res.status(200).json({
        type: "success",
        data: data,
      });
    } catch (err) {
      res.status(500).json({ type: "error", message: (err as Error).message });
    }
  };

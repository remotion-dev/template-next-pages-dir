// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRenderProgress, RenderProgress } from '@remotion/lambda'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config'
import axios from 'axios'

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  if (req.method !== 'GET') return res.status(405).end()
  const result = await getRenderProgress({
    ...config,
    renderId: req.query.id as string,
  })
  if (!result.outputFile) return res.status(404).end()
  
  const response = await axios.get(result.outputFile, {
    responseType: "stream",
  });
  if (response.status !== 200) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', response.headers['content-type']);
  response.data.pipe(res);
}

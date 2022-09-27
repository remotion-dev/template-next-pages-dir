// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRenderProgress, RenderProgress } from '@remotion/lambda'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config'

export default async function progress(
  req: NextApiRequest,
  res: NextApiResponse<RenderProgress>
) {
  if (req.method !== 'GET') return res.status(405).end()
  const result = await getRenderProgress({
    ...config,
    renderId: req.query.id as string,
  })
  res.status(200).json(result)
}

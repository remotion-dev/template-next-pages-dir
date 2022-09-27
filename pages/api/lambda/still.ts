// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { renderStillOnLambda, RenderStillOnLambdaOutput } from '@remotion/lambda'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config'

export default async function still(
  req: NextApiRequest,
  res: NextApiResponse<RenderStillOnLambdaOutput>
) {
  if (req.method !== 'POST') return res.status(405).end()
  const result = await renderStillOnLambda({
    ...config,
    composition: req.body.id,
    inputProps: req.body.inputProps,
  })
  res.status(200).json(result)
}

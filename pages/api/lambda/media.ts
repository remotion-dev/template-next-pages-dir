// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { renderMediaOnLambda, RenderMediaOnLambdaOutput } from '@remotion/lambda'
import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from '../../../config'


export default async function media(
  req: NextApiRequest,
  res: NextApiResponse<RenderMediaOnLambdaOutput>
) {
  if (req.method !== 'POST') return res.status(405).end()
  const result = await renderMediaOnLambda({
    ...config,
    composition: req.body.id,
    inputProps: req.body.inputProps,
  })
  res.status(200).json(result)
}

import { NowResponse } from '@vercel/node'

import auth from '../../middleware/auth'
import { findAll } from '../../database/collections/clusters'
import { ExtendedNowRequest } from '../../utils/types'


export default auth(async (req: ExtendedNowRequest, res: NowResponse) => {
  const clusters = await findAll(req.user.clusters, req.user.role);
  res.json(clusters)
})
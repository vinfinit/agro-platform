import { NowRequest, NowResponse } from '@vercel/node'
import { OK } from 'http-status-codes'
import Cookies from 'cookies'
import { AGROPLATFORM_JWT } from '../../utils/constants'


export default async (req: NowRequest, res: NowResponse) => {
  const cookies = new Cookies(req, res, { keys: [AGROPLATFORM_JWT] });
  cookies.set(AGROPLATFORM_JWT, null, { signed: true });

  res.status(OK).send('Token cleared');
};
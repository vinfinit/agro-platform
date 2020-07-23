import { NowRequest, NowResponse } from '@vercel/node'
import { UNAUTHORIZED } from 'http-status-codes'
import Cookies from 'cookies'
import jwt from 'jsonwebtoken'

import { UserEntity, ExtendedNowRequest } from '../utils/types'
import { AGROPLATFORM_JWT } from '../utils/constants'


export default (next: (req: ExtendedNowRequest, res: NowResponse) => any) => 
  async (req: NowRequest, res: NowResponse) => {
    const cookies = new Cookies(req, res, { keys: [AGROPLATFORM_JWT] });
    const token = cookies.get(AGROPLATFORM_JWT, { signed: true });
    const user: UserEntity = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

    if (user && user.email) {
      const extendedReq: any = { ...req, user };
      next(extendedReq, res);
    } else {
      console.error(`Unauthorized! user:${user?.email}:${user?.clusters}`);
      res.status(UNAUTHORIZED).send('Unauthorized');
    }
  };
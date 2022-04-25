import { VercelRequest, VercelResponse } from '@vercel/node'
import { UNAUTHORIZED, OK } from 'http-status-codes'
import Cookies from 'cookies'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library'

import { findUser, createUser } from '../../../database/collections/users'
import { AGROPLATFORM_JWT } from '../../../utils/constants'
import { UserEntity } from '../../../utils/types'
import config from '../../../config.json'


const generateJwt = (user: UserEntity): string => {
  const token = jwt.sign({ 
    email: user.email,
    role: user.role,
    clusters: user.clusters 
  }, process.env.JWT_PRIVATE_KEY);
  return token;
};

const googleProvider = async (req: VercelRequest): Promise<UserEntity> => {
  const auth = req.headers.authorization;
  const token = auth?.split('Bearer ')[1];
  if (!auth || !token) {
    return null;
  }

  const client = new OAuth2Client(config.GOOGLE_IDENTITY_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.GOOGLE_IDENTITY_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email } = payload;

  let user = await findUser(email);
  if (!user) {
    user = await createUser(email, [ config.DEMO_CLUSTER ]);
  }

  return {
    email: user.email,
    role: user.role,
    clusters: user.clusters
  };
};

const localProvider = async (req: VercelRequest): Promise<UserEntity> => {
  const auth = req.headers.authorization;
  const token = auth?.split('Basic ')[1];
  if (!auth || !token) {
    return null;
  }

  const [ email, password ] = Buffer.from(token, 'base64').toString().split(':');
  const user = await findUser(email);
  if (user && user.passwordHash) {
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      return {
        email: user.email,
        role: user.role,
        clusters: user.clusters
      }
    }
  }

  return null;
};

const login = async (req: VercelRequest, res: VercelResponse) => {
  let user: UserEntity;
  if (req.query.provider === 'google') {
    user = await googleProvider(req);
  } else if (req.query.provider === 'local') {
    user = await localProvider(req);
  }

  if (!user) {
    return res.status(UNAUTHORIZED).send('No user found');
  }

  const token = generateJwt(user);
  const cookies = new Cookies(req, res, { keys: [AGROPLATFORM_JWT] });
  cookies.set(AGROPLATFORM_JWT, token, { signed: true });
  
  res.status(OK).send('Token obtained');
};

export default login;
import { VercelRequest } from '@vercel/node'

export declare type UserEntity = {
  email: string;
  clusters: string[];
  role?: string;
}

export declare type ExtendedVercelRequest = VercelRequest & {
  user: UserEntity;
};
import { NowRequest } from '@vercel/node'

export declare type UserEntity = {
  email: string;
  clusters: string[];
  role?: string;
}

export declare type ExtendedNowRequest = NowRequest & {
  user: UserEntity;
};
import { User } from '../../generated/prisma-client';

export interface AuthPayload {
  token: string;
  user: User;
}
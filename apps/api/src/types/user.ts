import { JwtPayload } from '@repo/types';
import { Request } from 'express';

export type RequestWithUser = Request & { user: JwtPayload };

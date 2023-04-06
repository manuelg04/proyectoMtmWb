/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import { NextRequest } from 'next/server';
import { authMiddleware } from './authMiddleware';

export async function middleware(req: NextRequest) {
  return await authMiddleware(req);
}

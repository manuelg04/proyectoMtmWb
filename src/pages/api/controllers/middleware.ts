/* eslint-disable no-return-await */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../middlewares/authMiddleware';

export async function middleware(req: NextRequest) {
  return await authMiddleware(req);
}

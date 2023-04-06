/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
// middleware/authMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import cookie from 'cookie';
import logoutHandler from '../controllers/logout';

export async function authMiddleware(request: NextRequest) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const jwt = cookies.myTokenName;
  //console.log(jwt);

  if (request.nextUrl.pathname.includes('/dashboard')) {
    if (jwt === undefined) {
      return NextResponse.redirect(new URL('auth/login', request.url));
    }
    try {
      const { payload } = await jwtVerify(jwt, new TextEncoder().encode('secret'));
      //console.log(payload);
      return NextResponse.next();
    } catch (error) {
      //console.log(error);
      return NextResponse.redirect(new URL('auth/login', request.url));
    }
  }

  return NextResponse.next();
}

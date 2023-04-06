import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
  const serializedToken = serialize('myTokenName', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  console.log(serializedToken);

  const serializedDocumento = serialize('userDocumento', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  res.setHeader('Set-Cookie', [serializedToken, serializedDocumento]);
  return res.status(200).json('logout exitoso');
}

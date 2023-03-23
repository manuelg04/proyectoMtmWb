/* eslint-disable import/no-extraneous-dependencies */
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function loginHandler(req, res) {
  const { documento, password } = req.body;

  if (documento === 'admin@109.local' && password === 'admin') {
    // expire in 30 days
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        documento,
        username: 'fazt',
      },
      'secret',
    );

    const serialized = serialize('myTokenName', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
    });

    res.setHeader('Set-Cookie', serialized);
    return res.status(200).json({
      message: 'Login successful',
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}

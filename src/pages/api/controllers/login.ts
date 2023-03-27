/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// loginHandler.js
// pages/api/auth/login.ts
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import { getUserCredentials } from '../models/userCredentialsModel';

async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  const { documento, password } = req.body; // aqui puedo traer los datos del usuario
  // console.log('Documento:', documento); // Agrega esto para depurar
  // console.log('Password:', password); // Agrega esto para depurar
  const user = await getUserCredentials(documento);
  console.log('User:', user); // Agrega esto para depurar

  if (user) {
    const hashedPassword = createHash('sha512').update(password).digest('hex');
    console.log(hashedPassword);
    const match = hashedPassword === user.pass;
    console.log(user.pass);
    // console.log(user.pass);
    // console.log('Match:', match); // Agrega esto para depurar

    if (match === true) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //revisar a detalle expiracion del token
          documento,
          username: user.username,
        },
        'secret',
      );

      const serialized = serialize('myTokenName', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: '/',
      });

      res.setHeader('Set-Cookie', serialized);
      return res.status(200).json({ message: 'Login successful' });
    }
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}

export default loginHandler;

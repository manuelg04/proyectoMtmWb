/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { queryDatabase } from '../../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const dataUsuarios = await queryDatabase('SELECT * FROM mtm.usuario');
  res.status(200).json({
    dataUsuarios,
  });
  
  const { nombre, documento, cargo, email, sucursal_o_zona } = req.body;

  try {
    await queryDatabase('INSERT INTO mtm.usuarios (nombre, documento, cargo, email, sucursal_o_zona) VALUES (?, ?, ?, ?, ?)', [nombre, documento, cargo, email, sucursal_o_zona]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
}

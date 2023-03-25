/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next';
import { queryDatabase } from '../../../src/models/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const dataUsuarios = await queryDatabase('SELECT * FROM mtm.usuario');
  res.status(200).json({
    dataUsuarios,
  });
}

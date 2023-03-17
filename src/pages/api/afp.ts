import { NextApiRequest, NextApiResponse } from 'next';
import { queryDatabase } from '../../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const data = await queryDatabase('SELECT * FROM mtm.afp');
  res.status(200).json(data);
}

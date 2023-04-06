/* eslint-disable import/no-anonymous-default-export */
// pages/api/userName.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getUserNameByDocument } from '../models/userByDoc';

async function getUserName(req: NextApiRequest, res: NextApiResponse) {
  try {
    const documento = req.query.documento as string;
    const userName = await getUserNameByDocument(documento);
    res.status(200).json({ nombres: userName });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el nombre del usuario' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getUserName(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

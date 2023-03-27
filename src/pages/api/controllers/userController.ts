/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable import/prefer-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '../models/userModel';

export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await getAllUsers();
    console.log('Usuarios:', users); // Imprimir en consola del servidor
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    await getUsers(req, res);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};

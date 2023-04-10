/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUser } from '../models/deleteUser';

export default async function handleDeleteUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'DELETE') {
    const { documento } = req.query; // Cambiado de 'req.body' a 'req.query'
    console.log(req.method, req.query);

    try {
      await deleteUser(documento as string);
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}

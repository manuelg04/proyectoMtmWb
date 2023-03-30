import type { NextApiRequest, NextApiResponse } from 'next';
import { insertUser, User } from '../models/newUserModel';

export default async function CreateUserHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user: User = req.body;
      await insertUser(user);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

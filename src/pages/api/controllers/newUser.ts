import type { NextApiRequest, NextApiResponse } from 'next';
import { Usuario } from '@/tiposproyectomtm';
import { insertUser } from '../models/newUser';

export default async function CreateUserHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user: Usuario = req.body;
      await insertUser(user);
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

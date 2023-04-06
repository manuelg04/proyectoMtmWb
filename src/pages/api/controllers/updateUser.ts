import { NextApiRequest, NextApiResponse } from 'next';
import { Usuario } from '@/tiposproyectomtm';
import { updateUser } from '../models/uptdUser'; // Asegúrate de importar la función updateUser desde el archivo correcto

export default async function UpdateUserHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const user: Usuario = req.body;
      await updateUser(user);
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}

/* eslint-disable max-len */
import { NextApiRequest, NextApiResponse } from 'next';
import { emailRegistro } from '../helpers/email';

export default async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // obtener los datos de la petición
    const { email, nombre, token } = req.body;

    try {
      // intentar enviar el email
      await emailRegistro({ email, nombre, token });
      // si el correo electrónico se envía con éxito, devolver un código de estado 200
      res.status(200).json({ status: 'Ok', message: 'Correo de prueba enviado con éxito' });
    } catch (error) {
      // si algo sale mal, devolver un código de estado 500 y el error
      res.status(500).json({ status: 'Error', message: error.message });
    }
  } else {
    // si el método de la petición no es POST, devolver un código de estado 405 (Método no permitido)
    res.status(405).json({ status: 'Error', message: 'Sólo se aceptan peticiones POST' });
  }
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from 'mysql2/promise';
import bcrypt from 'bcrypt';

const dbConfig = {
  host: 'localhost',
  user: 'tu-usuario',
  password: 'tu-contraseña',
  database: 'mtm',
};

async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end(); // Método no permitido
    return;
  }

  const { documento, pass } = req.body;

  const db = await createConnection(dbConfig);

  try {
    const [rows, fields] = await db.query(
      'SELECT * FROM usuarios WHERE documento = ? LIMIT 1',
      [documento]
    );

    if (rows.length === 0) {
      res.status(401).end(); // Credenciales inválidas
      return;
    }

    const user = rows[0];

    const passwordMatches = await bcrypt.compare(pass, user.pass);
    if (!passwordMatches) {
      res.status(401).end(); // Credenciales inválidas
      return;
    }

    req.session.set('user', { documento: user.documento });
    await req.session.save();
    res.status(200).end(); // Autenticación exitosa
  } catch (error) {
    console.error(error);
    res.status(500).end(); // Error interno del servidor
  } finally {
    await db.end();
  }
}

export default login;
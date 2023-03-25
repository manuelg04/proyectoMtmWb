/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */

import mysql, {} from 'mysql2/promise';

export async function getUserCredentials(documento) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mtm',
  });

  const [rows] = await connection.execute(
    'SELECT documento, pass FROM usuario WHERE documento = ?',
    [documento],
  );

  await connection.end();

  return rows[0];
}

// export async function createUser(usuario) {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mtm',
//   });

//   await connection.execute(
//     'INSERT INTO usuario (nombres, documento, correo, cargo, sucursal) VALUES (?, ?, ?, ?, ?)',
//     [usuario.nombres, usuario.documento, usuario.correo, usuario.cargo, usuario.sucursal],
//   );

//   await connection.end();
// }

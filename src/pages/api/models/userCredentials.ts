/* eslint-disable import/prefer-default-export */
import db from '../../../db';

export async function getUserCredentials(documento: string) {
  const [rows] = await db.execute(
    'SELECT documento, pass FROM usuario WHERE documento = ?',
    [documento],
  );

  return rows[0];
}

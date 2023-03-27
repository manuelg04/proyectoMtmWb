/* eslint-disable import/prefer-default-export */
import db from './db';

export async function getAllUsers(): Promise<Array<{ nombre: string; documento: string }>> {
  const [rows] = await db.query('SELECT nombres, documento FROM usuario');
  return rows as Array<{ nombre: string; documento: string }>;
}

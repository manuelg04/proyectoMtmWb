/* eslint-disable import/prefer-default-export */
import db from './db';

export async function getAllUsers(): Promise<Array<{ nombre: string; documento: string }>> {
  const [rows] = await db.query('SELECT nombres, documento, fechad_creacion FROM usuario');
  return rows as Array<{ nombre: string; documento: string }>;
}
export async function getUserNameByDocument(documento: string): Promise<string | null> {
  const [rows] = await db.query('SELECT nombres FROM usuario WHERE documento = ?', [documento]);
  if (rows.length > 0) {
    return rows[0].nombres;
  }
  return null;
}

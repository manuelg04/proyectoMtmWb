/* eslint-disable import/prefer-default-export */
import { RowDataPacket } from 'mysql2';
import db from '../../../db';
import { QUERY_GET_ALL_USERS } from '../../../querysMySQL';

export async function getAllUsers(): Promise<Array<{ nombre: string; documento: string }>> {
  const [rows] = await db.query(QUERY_GET_ALL_USERS);
  console.log('Después de la consulta SQL en getAllUsers:', rows);
  return rows as Array<{ nombre: string; documento: string }>;
}
export async function getUserNameByDocument(documento: string): Promise<string | null> {
  const [rows] = await db.query('SELECT nombres FROM usuario WHERE documento = ?', [documento]);
  const rowData = rows as RowDataPacket[];
  if (rowData.length > 0) {
    return rows[0].nombres;
  }
  return null;
}

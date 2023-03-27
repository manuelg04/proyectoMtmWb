/* eslint-disable import/prefer-default-export */
// Reemplaza los tipos de datos según tu estructura
import db from './db';

export interface User {
    nombres: string;
    documento: string;
    cargo: string;
    correo: string;
    sucursal: string;
    rolid: number;
  }

export async function insertUser(user: User): Promise<void> {
  await db.query(
    'INSERT INTO usuario (nombres, documento, cargo, correo, sucursal, rolid) VALUES (?, ?, ?, ?, ?, ?)',
    [user.nombres, user.documento, user.cargo, user.correo, user.sucursal, user.rolid],
  );
}

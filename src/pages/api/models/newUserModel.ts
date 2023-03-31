/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// Reemplaza los tipos de datos según tu estructura
import db from './db';

export interface User {
    nombres: string;
    documento: string;
    celular: string;
    correo: string;
    sucursal: string;
    rolid: number;
    fechad_creacion: string;
    cargo: string;
  }
export async function insertUser(user: User): Promise<void> {
  await db.query(
    'INSERT INTO usuario (nombres, documento, celular, correo, sucursal, rolid, fechad_creacion, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [user.nombres, user.documento, user.celular, user.correo, user.sucursal, user.rolid, user.fechad_creacion, user.cargo],
  );
}

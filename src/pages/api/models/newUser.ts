/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { first } from 'lodash';
import db from '../../../db';
import { QUERY_COUNT_CHECK_BY_DOCUMENT } from '@/querysMySQLproyectomtm';

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
  const data = await QUERY_COUNT_CHECK_BY_DOCUMENT, [user.documento];
  //const data = await db.query('SELECT COUNT(*) as count FROM usuario WHERE documento = ?', [user.documento]);
  const primeroArr = first(data);
  if (first(primeroArr).count > 0) {
    throw new Error('El usuario ya existe');
  }
  await db.query(
    'INSERT INTO usuario (nombres, documento, celular, correo, sucursal, rolid, fechad_creacion, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [user.nombres, user.documento, user.celular, user.correo, user.sucursal, user.rolid, user.fechad_creacion, user.cargo],
  );
}

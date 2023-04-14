/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { first } from 'lodash';
import { QUERY_COUNT_CHECK_BY_DOCUMENT } from '@/querysMySQLproyectomtm';
import { Usuario } from '@/tiposproyectomtm';
import { RowDataPacket } from 'mysql2';
import db from '../../../db';

export async function insertUser(user: Usuario): Promise<any> {
  interface UserCount {
    count: number;
  }
  const result = await db.query(QUERY_COUNT_CHECK_BY_DOCUMENT, [user.documento]);
  // const data = await db.query('SELECT COUNT(*) as count FROM usuario WHERE documento = ?', [user.documento]);
  const data: UserCount[] = (result[0] as RowDataPacket[]).map((row) => ({
    count: row.count as number,
  }));
  const primeroArr = first(data);
  if (primeroArr && primeroArr.count > 0) {
    throw new Error('El usuario ya existe');
  }
  await db.query(
    'INSERT INTO usuario (nombres, documento, celular, correo, sucursal, rolid, fechad_creacion, cargo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [user.nombres, user.documento, user.celular, user.correo, user.sucursal, user.rolid, user.fechad_creacion, user.cargo],
  );
}

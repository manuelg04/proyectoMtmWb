/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { first } from 'lodash';
import { Usuario } from '@/tiposproyectomtm';
import { QUERY_UPDATE_USERS } from '@/querysMySQLproyectomtm';
import { RowDataPacket } from 'mysql2';
import db from '../../../db';

export async function updateUser(user: Usuario): Promise<any> {
  interface UserCount {
    count: number;
  }
  // Comprueba si el usuario existe en la base de datos
  const result = await db.query('SELECT COUNT(*) as count FROM usuario WHERE documento = ?', [user.documento]);
  const data:UserCount[] = (result[0] as RowDataPacket[]).map((row) => ({
    count: row.count as number,
  }));
  const primeroArr = first(data);
  if (primeroArr && primeroArr.count === 0) {
    throw new Error('El usuario no existe');
  }

  // Realiza la consulta SQL UPDATE para actualizar los campos del usuario en la tabla 'usuario'
  await db.query(QUERY_UPDATE_USERS, [user.nombres, user.celular, user.correo, user.sucursal, user.rolid, user.cargo, user.documento]);
}

/* eslint-disable import/prefer-default-export */
import db from '../../../db';

interface UserCount {
  count: number;
}
export async function deleteUser(documento: string): Promise<void> {
  // Consulta SQL para contar usuarios con el documento especificado
  const countUserQuery = 'SELECT COUNT(*) as count FROM usuario WHERE documento = ?';
  const data: UserCount[] = await db.query(countUserQuery, [documento]);
  // Utilizando el primer elemento del array con el índice cero en lugar de usar "first" de lodash
  const primeroArr = data[0];
  if (primeroArr && primeroArr.count === 0) {
    throw new Error('El usuario no existe');
  }
  // Consulta SQL para eliminar el usuario con el documento especificado
  const deleteUserQuery = 'DELETE FROM usuario WHERE documento = ?';

  await db.query(deleteUserQuery, [documento]);
}

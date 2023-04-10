export const QUERY_GET_ALL_USERS = ('SELECT nombres, documento, fechad_creacion, celular, correo, sucursal FROM usuario ORDER BY idusuario DESC');
export const QUERY_COUNT_CHECK_BY_DOCUMENT = 'SELECT COUNT(*) as count FROM usuario WHERE documento = ?';
export const QUERY_UPDATE_USERS = 'UPDATE usuario SET nombres = ?, celular = ?, correo = ?, sucursal = ?, rolid = ?, cargo = ? WHERE documento = ?';

export const B = '';

import db from './db';

export const QUERY_GET_ALL_USERS = db.query('SELECT nombres, documento, fechad_creacion FROM usuario ORDER BY idusuario DESC');
export const QUERY_COUNT_CHECK_BY_DOCUMENT = db.query('SELECT COUNT(*) as count FROM usuario WHERE documento = ?');

export const B = '';

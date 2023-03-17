import mysql, { Connection, FieldPacket } from 'mysql2/promise';

export const connection: Promise<Connection> = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mtm'
});

export async function queryDatabase(sql: string, params?: any[]): Promise<any[]> {
  try {
    const conn = await connection;
    const [rows, fields]: [any[], FieldPacket[]] = await conn.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
}

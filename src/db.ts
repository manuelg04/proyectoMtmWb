/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */

import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default connection;

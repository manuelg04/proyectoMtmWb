/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */

import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mtm',
});

export default connection;

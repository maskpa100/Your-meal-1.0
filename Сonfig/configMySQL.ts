import mysql from 'mysql2/promise';
require('dotenv').config({ path: '.env.local' });
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export async function query_MySql(sql: any, params?: any) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

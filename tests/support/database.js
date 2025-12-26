require('dotenv').config()

const { Pool } = require('pg')


const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};
const pool = new Pool(DbConfig);
export async function executeSQL(sqlScript) {
    try {
        const result = await pool.query(sqlScript);
        console.log(result.rows);
    } catch (error) {
        console.log('Erro ao executar SQL: ' + error);
    }
}
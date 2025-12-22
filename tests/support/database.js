const { Pool } = require('pg');

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'postgres',
    port: 5432
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
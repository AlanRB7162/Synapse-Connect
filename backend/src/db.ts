import mysql from 'mysql2';
import dotenv from "dotenv";
import chalk from 'chalk';

dotenv.config();

const requiredEnv = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT'];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
    });

db.getConnection((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log(chalk.green("Conexão com o banco de dados bem-sucedida."));
});

export default db;

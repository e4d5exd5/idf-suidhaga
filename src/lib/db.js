// import mysql from 'serverless-mysql';
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path');
import mysql from 'serverless-mysql';
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    }
});

export async function executeQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error) {
        return { error };
    }
}

function logToFile(msg) {
    console.log(msg);
    let fileName = new Date().toISOString().split('T')[0]
    const logFilePath = `logs/db/${fileName}.log`
    fs.appendFile(logFilePath, `${new Date().toISOString()}: ${msg}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    logging: msg => logToFile(msg)
});

export default sequelize
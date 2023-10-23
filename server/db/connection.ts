import { Sequelize, Dialect } from 'sequelize';

const dbName = process.env.DB_NAME || 'test';
const dbUser = process.env.DB_USER || 'root';

const db = new Sequelize(dbName, dbUser, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
    port: process.env.DB_PORT as number | undefined,
    logging: true,
});

export default db;
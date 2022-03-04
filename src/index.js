import 'dotenv/config';

import express from 'express';

import sequelize from 'sequelize';

let { Sequelize } = sequelize;

let app = express();

const dbConnection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

try {
    await dbConnection.authenticate();

    console.log('Conexão estabelecida com sucesso!');
} catch (error) {
    throw error;
}

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

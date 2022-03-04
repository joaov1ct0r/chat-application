import 'dotenv/config';

import express from 'express';

import mysql from 'mysql2';

let dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

let app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

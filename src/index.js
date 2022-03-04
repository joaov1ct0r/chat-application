import 'dotenv/config';

import express from 'express';

import sequelize from 'sequelize';

let { Sequelize } = sequelize;

let app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

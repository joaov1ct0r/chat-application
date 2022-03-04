import sequelize from 'sequelize';

let { Sequelize } = sequelize;

const dbConnection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

try {
    let connected = await dbConnection.authenticate();

    if (connected) {
        console.log('Conexão estabelecida com sucesso!');
    }
} catch (error) {
    throw error;
}

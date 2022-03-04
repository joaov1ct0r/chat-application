import sequelize from 'sequelize';

let { Sequelize } = sequelize;

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

try {
    await sequelize.authenticate();

    console.log('Conexão estabelecida com sucesso!');
} catch (error) {
    throw error;
}

export default sequelize;

import { DataTypes } from 'sequelize';

import dbConnection from '../config/database/database';

const user = dbConnection.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        nascimento: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'users'
    }
);

user.sync();

export default user;

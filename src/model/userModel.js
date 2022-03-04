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
            type: DataTypes.STRING,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nascimento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        tableName: 'users'
    }
);

export default user;

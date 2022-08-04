import { DataTypes, ModelStatic } from "sequelize";

import DB from "../config/database";

const User = DB.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nascimento: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "users",
    timestamps: false,
  }
);

User.sync();

export default User;

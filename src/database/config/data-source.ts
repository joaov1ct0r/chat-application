import { DataSource } from "typeorm";

import User from "../entity/userModel";

const DB: DataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "production"
      ? process.env.DB_DATABASE
      : process.env.DB_DATABASE_TEST,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: ["../migration/**"],
});

export default DB;

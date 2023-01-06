/* eslint-disable @typescript-eslint/no-non-null-assertion */
import "dotenv/config";
import { DataSource } from "typeorm";
import User from "../entities/User";

const DB: DataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USER! as string,
  password: process.env.DB_PASSWORD!,
  database:
    process.env.NODE_ENV! === "production"
      ? process.env.DB_DATABASE!
      : process.env.DB_DATABASE_TEST!,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [
    process.env.NODE_ENV! === "production"
      ? "build/migrations/**"
      : "src/migrations/**",
  ],
  migrationsRun: true,
});

export default DB;

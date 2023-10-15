import { DataSource } from 'typeorm'
import User from '../entities/User'

const databaseClient: DataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: ['src/migrations/**'],
  migrationsRun: true,
})

export default databaseClient

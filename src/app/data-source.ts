import 'dotenv/config';

import { DataSource } from 'typeorm';
import { Location } from './entities/Location';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres' | 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  entities: [Location],
  subscribers: [],
  migrations: [],
});

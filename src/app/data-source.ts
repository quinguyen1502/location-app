import 'dotenv/config';

import { DataSource } from 'typeorm';
import { Location } from './location/entities/Location';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE as 'postgres' | 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.ENV === 'development',
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [Location],
  subscribers: [],
  migrations: [],
});

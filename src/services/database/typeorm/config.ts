import 'reflect-metadata';
import models from './models';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// const configService = new ConfigService();

export enum DATABASE_TYPES {
  MYSQL = 'mysql',
  PG = 'postgres',
}
config();

const configService = new ConfigService();

export const DATABASE_CONFIG = {
  type: DATABASE_TYPES.PG,
  // url: DB_URL,
  // type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: [...models],
  migrations: [__dirname + '/migrations/staging/*.ts'],

  migrationsTableName: 'custom_migration',
  synchronize: false, // default setting
  retryAttempts: 10,
  retryDelay: 3000,
  logging: false,
  autoLoadEntities: false,
  cli: {
    migrationsDir: '../staging',
  },

  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: configService.get('POSTGRES_SQL_CERT'),

  // },
  // host: DB_HOST,
  // port: Math.abs(Number(DB_PORT)),
  // username: DB_USER,
  // password: DB_PASSWORD,
  // database: DB_NAME,
  // entities: models,
  // migrations: [],
};

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import models from './models';

config();

const configService = new ConfigService();
export default new DataSource({
  type: 'postgres',
  url: configService.get('DB_PROD_URL'),
  // host: configService.get('DB_PROD_HOST'),
  entities: [...models],
  migrations: [],
  // ssl: {
  //   rejectUnauthorized: false,
  //   ca: configService.get('POSTGRES_SQL_CERT_PROD'),
  // },
});

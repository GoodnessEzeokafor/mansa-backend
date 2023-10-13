require('dotenv').config();
import { Logger } from '@nestjs/common/services/logger.service';

function getEnv(variable: string, optional = false) {
  if (process.env[variable] === undefined) {
    if (optional) {
      Logger.warn(
        `[@env]: Environmental variable for ${variable} is not supplied. \n So a default value will be generated for you.`,
      );
    } else {
      throw new Error(
        `You must create an environment variable for ${variable}`,
      );
    }
  }

  return process.env[variable]?.replace(/\\n/gm, '\n');
}
// environment
export const env = {
  isDev: String(process.env.NODE_ENV).toLowerCase().includes('dev'),
  isTest: String(process.env.NODE_ENV).toLowerCase().includes('test'),
  isProd: String(process.env.NODE_ENV).toLowerCase().includes('prod'),
  isStaging: String(process.env.NODE_ENV).toLowerCase().includes('staging'),
  env: process.env.NODE_ENV,
};

export const PORT = getEnv('PORT', true);
export const NODE_ENV = getEnv('NODE_ENV', true);
export const DATABASE_URL = getEnv('DATABASE_URL', true);
// export const DB_HOST = getEnv('DB_HOST', true);
// export const DB_PORT = getEnv('DB_PORT', true);
// export const DB_USER = getEnv('DB_USER', true);
// export const DB_PASSWORD = getEnv('DB_PASSWORD', true);
// export const DB_NAME = getEnv('DB_NAME', true);
export const JWT_SECRET_KEY = String(getEnv('JWT_SECRET_KEY', true));

// export const REDIS_CLIENT_NAME = getEnv('REDIS_CLIENT_NAME', true);
// export const REDIS_PORT = getEnv('REDIS_PORT', true);
// export const REDIS_HOST = getEnv('REDIS_HOST', true);
// export const REDIS_PASSWORD = getEnv('REDIS_PASSWORD', true);

export const JWT_EXPIRY_TIME_IN_HR = 5;

export const TEN_MIN_IN_SECONDS = 600;
export const TWENTY_FOUR_HR_IN_SECONDS = 3600;
export const RESET_PASSWORD_EXPIRY_IN_SECONDS = 600;
export const THIRTY_MIN_IN_SECONDS = 1800;
export const FRONTEND_URL = 'localhost';

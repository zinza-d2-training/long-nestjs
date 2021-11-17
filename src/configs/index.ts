import { config } from 'dotenv';

config({ path: '.env' });

export const dbConfigs = {
  secretKey: process.env.SECRET_KEY,
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};

export const origin = process.env.ORIGIN;

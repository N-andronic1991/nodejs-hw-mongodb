import path from 'node:path';
export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN',
};

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const minLengthOfTypeStringField = 3;
export const maxLengthOfTypeStringField = 20;

export const ACCESS_TOKEN_VALID_UNTIL = Date.now() + 1000 * 60 * 15;
export const REFRESH_TOKEN_VALID_UNTIL = Date.now() + 1000 * 60 * 60 * 24 * 30;

export const TEMPLATE_DIR = path.join(process.cwd(), 'src', 'templates');

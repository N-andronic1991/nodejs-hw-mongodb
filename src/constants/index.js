export const ENV_VARS = {
  PORT: 'PORT',
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};
export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const minLengthOfTypeStringField = 3;
export const maxLengthOfTypeStringField = 20;

export const ACCESS_TOKEN_VALID_UNTIL = Date.now() + 1000 * 60 * 15; //15min
export const REFRESH_TOKEN_VALID_UNTIL = Date.now() + 1000 * 60 * 60 * 24 * 7; //7 days

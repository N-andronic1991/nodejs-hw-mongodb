import mongoose from 'mongoose';

import { env } from '../utils/env.js';
import { ENV_VARS } from '../constants/index.js';

export const initMongoDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${env(ENV_VARS.MONGODB_USER)}:${env(
        ENV_VARS.MONGODB_PASSWORD,
      )}@${env(ENV_VARS.MONGODB_URL)}/${env(
        ENV_VARS.MONGODB_DB,
      )}?retryWrites=true&w=majority`,
    );
    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};

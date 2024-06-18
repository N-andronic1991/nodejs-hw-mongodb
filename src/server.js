import pino from 'pino-http';
import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { ENV_VARS } from './constants/index.js';
import rootRouter from './routers/index.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100mb',
    }),
  );
  app.use(cors());
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(rootRouter);
  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

import pino from 'pino-http';
import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { ENV_VARS } from './constants/index.js';
import contactsRouter from './routers/contacts.js';

const app = express();
const PORT = Number(env(ENV_VARS.PORT, '3000'));

export const setupServer = () => {
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);
  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

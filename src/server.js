import pino from 'pino-http';
import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { ENV_VARS } from './constants/index.js';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      message: 'Successfully get all students!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: `User with id ${contactId} not found!`,
      });
    }

    res.status(200).json({
      message: `Successfully get contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', notFoundMiddleware);

  app.use(errorHandlerMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

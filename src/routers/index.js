import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
const rootRouter = Router();
rootRouter.use('/contacts', contactsRouter);
rootRouter.use('/auth', authRouter);
export default rootRouter;

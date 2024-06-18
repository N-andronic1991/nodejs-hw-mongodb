import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from '../controllers/auth.js';

const authRouter = Router();

authRouter.use(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.use(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
// authRouter.use('/refresh');
authRouter.use('/logout', ctrlWrapper(logoutUserController));
export default authRouter;

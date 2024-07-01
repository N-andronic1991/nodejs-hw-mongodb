import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetPasswordEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController,
  resetPasswordController,
  resetPasswordEmailController,
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
authRouter.use('/refresh', ctrlWrapper(refreshUserController));

authRouter.use('/logout', ctrlWrapper(logoutUserController));

authRouter.use(
  '/send-reset-email',
  validateBody(resetPasswordEmailSchema),
  ctrlWrapper(resetPasswordEmailController),
);

authRouter.use(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;

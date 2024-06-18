import { REFRESH_TOKEN_VALID_UNTIL } from '../constants/index.js';
import { createUser, loginUser, logoutUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await createUser(req.body);
  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: REFRESH_TOKEN_VALID_UNTIL,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: REFRESH_TOKEN_VALID_UNTIL,
  });

  res.json({
    status: 200,
    message: 'Successfully login user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });
  res.clearCookie('sessionId');

  res.clearCookie('sessionToken');
  res.status(204).send();
};

import { REFRESH_TOKEN_VALID_UNTIL } from '../constants/index.js';
import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
  resetPasswordEmail,
} from '../services/auth.js';

const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: REFRESH_TOKEN_VALID_UNTIL,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: REFRESH_TOKEN_VALID_UNTIL,
  });
};

export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);
  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);
  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshUserController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;

  const session = await refreshSession({ sessionId, sessionToken });
  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
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

export const resetPasswordEmailController = async (req, res) => {
  await resetPasswordEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    status: 200,
    message: 'Password was successfully reset!',
    data: {},
  });
};

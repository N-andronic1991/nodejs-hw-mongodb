import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import {
  ACCESS_TOKEN_VALID_UNTIL,
  ENV_VARS,
  SMTP,
  REFRESH_TOKEN_VALID_UNTIL,
  TEMPLATE_DIR,
} from '../constants/index.js';
import { sendMail } from '../utils/sendMail.js';
import { env } from '../utils/env.js';
import Handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';

const createSession = () => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: ACCESS_TOKEN_VALID_UNTIL,
    refreshTokenValidUntil: REFRESH_TOKEN_VALID_UNTIL,
  };
};

export const createUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email is already in use');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(password, user.password); // Порівнюємо хеші паролів

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const refreshSession = async ({ sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const resetPasswordEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const token = jwt.sign({ sub: user._id, email }, env(ENV_VARS.JWT_SECRET), {
    expiresIn: '5m',
  });

  const templateSource = await fs.readFile(
    path.join(TEMPLATE_DIR, 'reset-password-email.html'),
  );

  const template = Handlebars.compile(templateSource.toString());

  const html = template({
    name: user.name,
    link: `${env(ENV_VARS.APP_DOMAIN)}/reset-pwd?token=${token}`,
  });

  try {
    await sendMail({
      from: env(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (err) {
    console.log(err);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async ({ password, token }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (err) {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({
    _id: tokenPayload.sub,
    email: tokenPayload.email,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  await User.updateOne(
    {
      _id: user._id,
    },
    { password: hashedPassword },
  );
};

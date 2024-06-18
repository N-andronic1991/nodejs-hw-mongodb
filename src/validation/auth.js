import Joi from 'joi';
import { minLengthOfTypeStringField } from '../constants/index.js';
import { maxLengthOfTypeStringField } from '../constants/index.js';
export const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
});

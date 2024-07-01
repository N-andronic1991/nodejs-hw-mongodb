import Joi from 'joi';
import { minLengthOfTypeStringField } from '../constants/index.js';
import { maxLengthOfTypeStringField } from '../constants/index.js';

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .required(),
  phoneNumber: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .required()
    .pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
  email: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .email()
    .allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .valid('work', 'home', 'personal'),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField),
  phoneNumber: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .pattern(/^\+|\d[\s\d\-\(\)]*\d$/),
  email: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .email()
    .allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(minLengthOfTypeStringField)
    .max(maxLengthOfTypeStringField)
    .valid('work', 'home', 'personal'),
});

import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      throw error('Id is not provided');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createHttpError(400, 'Invalid ID format'));
    }
    return next();
  };

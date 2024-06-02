import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: {
        message: err.message,
      },
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Mongoose error',
      data: {
        message: err.message,
      },
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: {
      error: err.message,
    },
  });
};

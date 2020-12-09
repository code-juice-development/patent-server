import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import UpdateProcessError from '@shared/errors/UpdateProcessError';

const errorHandler = async (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Promise<Response> => {
  // eslint-disable-next-line no-console
  console.log(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof UpdateProcessError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error',
  });
};

export default errorHandler;

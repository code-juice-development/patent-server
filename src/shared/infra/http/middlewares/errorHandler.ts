/* eslint-disable no-console */

import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

const errorHandler = async (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Promise<Response> => {
  console.log(error);

  if (error instanceof AppError) {
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

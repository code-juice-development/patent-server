import { Request, Response, NextFunction } from 'express';
import { inject, injectable, container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';

@injectable()
class TokenProvider implements ITokenProvider {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async generateToken(user_id: string): Promise<string> {
    return this.tokenProvider.generateToken(user_id);
  }

  public async verifyToken(token: string): Promise<string | undefined> {
    return this.tokenProvider.verifyToken(token);
  }
}

const isUserLoggedIn = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = request.headers;
  const tokenProvider = container.resolve(TokenProvider);

  if (authorization === undefined) {
    throw new AppError('You are not logged in', 401);
  }

  const [, token] = authorization.split(' ');

  const user_id = await tokenProvider.verifyToken(token);

  if (user_id !== undefined) {
    request.user = {
      id: user_id,
    };

    return next();
  }

  throw new AppError('Invalid Token', 401);
};

export default isUserLoggedIn;

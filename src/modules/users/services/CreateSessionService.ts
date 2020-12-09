import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import ITokenProvider from '@modules/users/providers/TokenProvider/models/ITokenProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  email: string;

  password: string;
}

interface IResponse {
  user: User;

  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong Email/Password', 401);
    }

    const isMatchPassword = await this.hashProvider.compareHash(
      password,
      String(user.password),
    );

    if (!isMatchPassword) {
      throw new AppError('Wrong Email/Password', 401);
    }

    const token = await this.tokenProvider.generateToken(user.id);

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;

  password: string;

  new_password: string;
}

@injectable()
class UpdateUserPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    id,
    password,
    new_password,
  }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Wrong Data', 401);
    }

    const isMatchPassword = await this.hashProvider.compareHash(
      password,
      String(user.password),
    );

    if (!isMatchPassword) {
      throw new AppError('Wrong Data', 401);
    }

    const hashedPassword = await this.hashProvider.generateHash(new_password);

    await this.usersRepository.updatePassword({
      id,
      password: hashedPassword,
    });
  }
}

export default UpdateUserPasswordService;

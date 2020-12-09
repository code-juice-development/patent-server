import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  id: string;

  email: string;

  name: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, email, name }: IRequest): Promise<User> {
    const user = await this.usersRepository.update({ id, email, name });

    return user;
  }
}

export default UpdateUserService;

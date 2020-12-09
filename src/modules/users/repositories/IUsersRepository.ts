import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUpdateUserPasswordDTO from '@modules/users/dtos/IUpdateUserPasswordDTO';

import User from '@modules/users/infra/typeorm/entities/User';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;

  update(data: IUpdateUserDTO): Promise<User>;

  updatePassword(data: IUpdateUserPasswordDTO): Promise<User>;

  delete(id: string): Promise<void>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findAll(): Promise<User[]>;
}

export default IUsersRepository;

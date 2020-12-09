import { v4 } from 'uuid';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUpdateUserPasswordDTO from '@modules/users/dtos/IUpdateUserPasswordDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    const id = v4();

    Object.assign(user, { id, email, name, password });

    this.users.push(user);

    return user;
  }

  public async update({ id, email, name }: IUpdateUserDTO): Promise<User> {
    const user = this.users.find((actualUser) => actualUser.id === id);

    Object.assign(user, { id, email, name });

    return user ?? new User();
  }

  public async updatePassword({
    id,
    password,
  }: IUpdateUserPasswordDTO): Promise<User> {
    const user = this.users.find((actualUser) => actualUser.id === id);

    Object.assign(user, { id, password });

    return user ?? new User();
  }

  public async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((actualUser) => actualUser.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((actualUser) => actualUser.email === email);

    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }
}

export default FakeUsersRepository;

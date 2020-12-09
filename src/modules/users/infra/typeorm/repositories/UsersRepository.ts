import { Repository, getRepository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUpdateUserPasswordDTO from '@modules/users/dtos/IUpdateUserPasswordDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ email, name, password });

    await this.repository.save(user);

    return user;
  }

  public async update({ id, email, name }: IUpdateUserDTO): Promise<User> {
    const user = this.repository.create({ id, email, name });

    await this.repository.save(user);

    return user;
  }

  public async updatePassword({
    id,
    password,
  }: IUpdateUserPasswordDTO): Promise<User> {
    const user = this.repository.create({ id, password });

    await this.repository.save(user);

    return user;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

export default UsersRepository;

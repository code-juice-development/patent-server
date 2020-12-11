import { Repository, getRepository } from 'typeorm';

import IClientsRepository, {
  IDataFindIndexed,
} from '@modules/clients/repositories/IClientsRepository';

import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/clients/dtos/IUpdateClientDTO';

import Client from '@modules/clients/infra/typeorm/entities/Client';

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>;

  constructor() {
    this.repository = getRepository(Client);
  }

  public async create({
    name,
    email,
    phone,
    cpf,
    cnpj,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.repository.create({ name, email, phone, cpf, cnpj });

    await this.repository.save(client);

    return client;
  }

  public async update({
    id,
    name,
    email,
    phone,
    cpf,
    cnpj,
  }: IUpdateClientDTO): Promise<Client> {
    const client = this.repository.create({
      id,
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    await this.repository.save(client);

    return client;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<Client[]> {
    const users = await this.repository.find();

    return users;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const user = await this.repository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    const user = await this.repository.findOne({ phone });

    return user;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const user = await this.repository.findOne({ cpf });

    return user;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const user = await this.repository.findOne({ cnpj });

    return user;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<Client[]> {
    const queryBuilder = this.repository.createQueryBuilder('clients');

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1]),
    );

    queryBuilder.where(filters);
    queryBuilder.skip(page * rows);
    queryBuilder.take(rows);
    queryBuilder.orderBy(ordenation);

    const users = await queryBuilder.getMany();

    return users;
  }
}

export default ClientsRepository;

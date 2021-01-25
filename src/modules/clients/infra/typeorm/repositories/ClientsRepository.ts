import { Repository, getRepository } from 'typeorm';

import IClientsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
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
    const clients = await this.repository.find();

    return clients;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.repository.findOne(id);

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ email });

    return client;
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ phone });

    return client;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ cpf });

    return client;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = await this.repository.findOne({ cnpj });

    return client;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('clients');

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1] !== null),
    );

    queryBuilder.where(filters).orderBy(ordenation);

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [clients, total] = await queryBuilder.getManyAndCount();

    return { total, clients };
  }
}

export default ClientsRepository;

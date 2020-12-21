import { v4 } from 'uuid';

import IClientsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/clients/repositories/IClientsRepository';

import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/clients/dtos/IUpdateClientDTO';

import Client from '@modules/clients/infra/typeorm/entities/Client';

class FakeClientsRepository implements IClientsRepository {
  private clients: Client[];

  constructor() {
    this.clients = [];
  }

  public async create({
    name,
    email,
    phone,
    cpf,
    cnpj,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    const id = v4();

    Object.assign(client, {
      id,
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    this.clients.push(client);

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
    const client = this.clients.find((actualClient) => actualClient.id === id);

    Object.assign(client, {
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    return client ?? new Client();
  }

  public async delete(id: string): Promise<void> {
    this.clients = this.clients.filter((client) => client.id !== id);
  }

  public async findAll(): Promise<Client[]> {
    return this.clients;
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = this.clients.find((actualClient) => actualClient.id === id);

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = this.clients.find(
      (actualClient) => actualClient.email === email,
    );

    return client;
  }

  public async findByPhone(phone: string): Promise<Client | undefined> {
    const client = this.clients.find(
      (actualClient) => actualClient.phone === phone,
    );

    return client;
  }

  public async findByCpf(cpf: string): Promise<Client | undefined> {
    const client = this.clients.find(
      (actualClient) => actualClient.cpf === cpf,
    );

    return client;
  }

  public async findByCnpj(cnpj: string): Promise<Client | undefined> {
    const client = this.clients.find(
      (actualClient) => actualClient.cnpj === cnpj,
    );

    return client;
  }

  /**
   * @todo Include ordering
   */
  public async findIndexed({
    page,
    rows,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const { name, email, phone, cpf, cnpj } = filter;

    const total = this.clients.length;

    const filteredClients = this.clients.filter((client) => {
      if (name && client.name !== name) return false;
      if (email && client.email !== email) return false;
      if (phone && client.phone !== phone) return false;
      if (cpf && client.cpf !== cpf) return false;
      if (cnpj && client.cnpj !== cnpj) return false;

      return true;
    });

    const clients = filteredClients.slice(page * rows, rows);

    return { total, clients };
  }
}

export default FakeClientsRepository;

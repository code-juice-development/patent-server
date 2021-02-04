import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/clients/dtos/IUpdateClientDTO';

import Client from '@modules/clients/infra/typeorm/entities/Client';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    name: string | null;

    email: string | null;

    phone: string | null;

    cpf: string | null;

    cnpj: string | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  clients: Client[];
}

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;

  update(data: IUpdateClientDTO): Promise<Client>;

  delete(id: string): Promise<void>;

  findAll(): Promise<Client[]>;

  countAll(): Promise<number>;

  findById(id: string): Promise<Client | undefined>;

  findByEmail(email: string): Promise<Client | undefined>;

  findByPhone(phone: string): Promise<Client | undefined>;

  findByCpf(cpf: string): Promise<Client | undefined>;

  findByCnpj(cnpj: string): Promise<Client | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;
}

export default IClientsRepository;

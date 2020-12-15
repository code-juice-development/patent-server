import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IUpdateClientDTO from '@modules/clients/dtos/IUpdateClientDTO';

import Cliente from '@modules/clients/infra/typeorm/entities/Client';

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

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Cliente>;

  update(data: IUpdateClientDTO): Promise<Cliente>;

  delete(id: string): Promise<void>;

  findAll(): Promise<Cliente[]>;

  findById(id: string): Promise<Cliente | undefined>;

  findByEmail(id: string): Promise<Cliente | undefined>;

  findByPhone(id: string): Promise<Cliente | undefined>;

  findByCpf(id: string): Promise<Cliente | undefined>;

  findByCnpj(id: string): Promise<Cliente | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<Cliente[]>;
}

export default IClientsRepository;

import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  name: string | null;

  email: string | null;

  phone: string | null;

  cpf: string | null;

  cnpj: string | null;
}

interface IResponse {
  total: number;

  clients: Client[];
}

@injectable()
class ListClientsIndexedService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    name,
    email,
    phone,
    cpf,
    cnpj,
  }: IRequest): Promise<IResponse> {
    const { total, clients } = await this.clientsRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: { name, email, phone, cpf, cnpj },
    });

    return { total, clients };
  }
}

export default ListClientsIndexedService;

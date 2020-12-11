import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<Client[]> {
    const users = await this.clientsRepository.findAll();

    return users;
  }
}

export default ListClientsService;

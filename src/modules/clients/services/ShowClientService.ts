import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class ShowClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Client> {
    const user = await this.clientsRepository.findById(id);

    if (!user) {
      throw new AppError('Não contrado Cliente com o ID informado');
    }

    return user;
  }
}

export default ShowClientService;

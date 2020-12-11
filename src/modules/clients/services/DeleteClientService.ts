import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}

export default DeleteClientService;

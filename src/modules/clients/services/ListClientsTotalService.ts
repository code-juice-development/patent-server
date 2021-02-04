import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

@injectable()
class ListClientsTotalService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.clientsRepository.countAll();

    return count;
  }
}

export default ListClientsTotalService;

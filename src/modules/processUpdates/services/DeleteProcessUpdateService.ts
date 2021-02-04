import { injectable, inject } from 'tsyringe';

import IProcessUpdatesRepository from '@modules/processUpdates/repositories/IProcessUpdatesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProcessUpdateService {
  constructor(
    @inject('ProcessUpdatesRepository')
    private processUpdatesRepository: IProcessUpdatesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.processUpdatesRepository.delete(id);
  }
}

export default DeleteProcessUpdateService;

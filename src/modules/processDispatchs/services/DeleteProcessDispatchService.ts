import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProcessDispatchService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.processDispatchsRepository.delete(id);
  }
}

export default DeleteProcessDispatchService;

import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

@injectable()
class ListProcessDispatchsService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute(): Promise<ProcessDispatch[]> {
    const processDispatchs = await this.processDispatchsRepository.findAll();

    return processDispatchs;
  }
}

export default ListProcessDispatchsService;

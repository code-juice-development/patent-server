import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  id: string;

  resolved_pending: boolean;
}

@injectable()
class UpdateProcessDispatchPendingService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({
    id,

    resolved_pending,
  }: IRequest): Promise<ProcessDispatch> {
    const processDispatch = await this.processDispatchsRepository.updatePending(
      id,
      resolved_pending,
    );

    return processDispatch;
  }
}

export default UpdateProcessDispatchPendingService;

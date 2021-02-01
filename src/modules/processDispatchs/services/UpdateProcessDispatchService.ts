import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  id: string;

  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  publication: string;

  process_id: string;

  dispatch_id: string;
}

@injectable()
class UpdateProcessDispatchService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({
    id,
    has_pending,
    status_pending,
    resolved_pending,
    publication,
    process_id,
    dispatch_id,
  }: IRequest): Promise<ProcessDispatch> {
    const processDispatch = await this.processDispatchsRepository.update({
      id,
      has_pending,
      status_pending,
      resolved_pending,
      publication,
      process_id,
      dispatch_id,
    });

    return processDispatch;
  }
}

export default UpdateProcessDispatchService;

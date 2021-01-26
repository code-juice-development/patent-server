import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  has_pending: boolean | null;

  resolved_pending: boolean | null;

  process_id: string | null;

  dispatch_id: string | null;
}

interface IResponse {
  total: number;

  process_dispatchs: ProcessDispatch[];
}

@injectable()
class ListProcessDispatchsIndexedService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    has_pending,
    resolved_pending,
    process_id,
    dispatch_id,
  }: IRequest): Promise<IResponse> {
    const {
      total,
      process_dispatchs,
    } = await this.processDispatchsRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: {
        has_pending,
        resolved_pending,
        process_id,
        dispatch_id,
      },
    });

    return { total, process_dispatchs };
  }
}

export default ListProcessDispatchsIndexedService;

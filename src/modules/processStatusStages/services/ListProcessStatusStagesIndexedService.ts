import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

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

  process_status_stages: ProcessStatusStage[];
}

@injectable()
class ListProcessStatusStagesIndexedService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
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
      process_status_stages,
    } = await this.processStatusStagesRepository.findIndexed({
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

    return { total, process_status_stages };
  }
}

export default ListProcessStatusStagesIndexedService;

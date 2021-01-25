import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  id: string;

  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  dispatch_id: string;
}

@injectable()
class UpdateProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({
    id,
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    dispatch_id,
  }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.processStatusStagesRepository.update({
      id,
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      dispatch_id,
    });

    return processStatusStage;
  }
}

export default UpdateProcessStatusStageService;

import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  process_stage_id: string;
}

@injectable()
class CreateProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    process_stage_id,
  }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.processStatusStagesRepository.create({
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    return processStatusStage;
  }
}

export default CreateProcessStatusStageService;

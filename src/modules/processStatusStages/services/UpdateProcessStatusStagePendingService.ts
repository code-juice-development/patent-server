import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  id: string;

  resolved_pending: boolean;
}

@injectable()
class UpdateProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({
    id,

    resolved_pending,
  }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.processStatusStagesRepository.updatePending(
      id,
      resolved_pending,
    );

    return processStatusStage;
  }
}

export default UpdateProcessStatusStageService;

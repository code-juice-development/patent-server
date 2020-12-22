import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

@injectable()
class ListProcessStatusStagesService {
  constructor(
    @inject('ProcessStatusStageRepository')
    private processStatusStageRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute(): Promise<ProcessStatusStage[]> {
    const processStatusStages = await this.processStatusStageRepository.findAll();

    return processStatusStages;
  }
}

export default ListProcessStatusStagesService;

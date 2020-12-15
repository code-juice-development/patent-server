import { injectable, inject } from 'tsyringe';

import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

@injectable()
class ListProcessStagesService {
  constructor(
    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,
  ) {}

  public async execute(): Promise<ProcessStage[]> {
    const processStages = await this.processStagesRepository.findAll();

    return processStages;
  }
}

export default ListProcessStagesService;

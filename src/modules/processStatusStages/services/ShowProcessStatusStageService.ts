import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  id: string;
}

@injectable()
class ShowProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStageRepository')
    private ProcessStatusStageRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.ProcessStatusStageRepository.findById(
      id,
    );

    if (!processStatusStage) {
      throw new AppError(
        'Não contrado Fase de Status do Processo com o ID informado',
      );
    }

    return processStatusStage;
  }
}

export default ShowProcessStatusStageService;

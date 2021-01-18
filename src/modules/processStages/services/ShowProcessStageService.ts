import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

interface IRequest {
  id: string;
}

@injectable()
class ShowProcessStageService {
  constructor(
    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ProcessStage> {
    const processStage = await this.processStagesRepository.findById(id);

    if (!processStage) {
      throw new AppError('Não encontrada Fase do Processo com o ID informado');
    }

    return processStage;
  }
}

export default ShowProcessStageService;

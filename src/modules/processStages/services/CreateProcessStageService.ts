import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

interface IRequest {
  name: string;

  code: string;

  description: string;

  deadline: string;

  send_message: boolean;

  model_message: string;

  send_email: boolean;

  model_email: string;
}

@injectable()
class CreateProcessStageService {
  constructor(
    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,
  ) {}

  public async execute({
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
  }: IRequest): Promise<ProcessStage> {
    const processStageWithSameName = await this.processStagesRepository.findByName(
      name,
    );

    if (processStageWithSameName) {
      throw new AppError(
        'Já existe uma Fase do Processo cadastrada com este Nome',
      );
    }

    const processStageWithSameCode = await this.processStagesRepository.findByCode(
      code,
    );

    if (processStageWithSameCode) {
      throw new AppError(
        'Já existe uma Fase do Processo cadastrada com este Código',
      );
    }

    const processStage = await this.processStagesRepository.create({
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    return processStage;
  }
}

export default CreateProcessStageService;
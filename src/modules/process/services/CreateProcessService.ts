import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';
import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';
import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  number: string;

  brand: string;

  kind: string;

  presentation: string;

  last_update: string;

  birthday: string;

  client_id: string;

  process_stage_id: string;
}

@injectable()
class CreateProcessService {
  constructor(
    @inject('ProcessesRepository')
    private processesRepository: IProcessRepository,

    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,

    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    client_id,
    process_stage_id,
  }: IRequest): Promise<Process> {
    const processWithSameNumber = await this.processesRepository.findByNumber(
      number,
    );

    if (processWithSameNumber) {
      throw new AppError('Já existe um Processo registrado com esse Número');
    }

    const processWithSameBrand = await this.processesRepository.findByBrand(
      brand,
    );

    if (processWithSameBrand) {
      throw new AppError('Já existe um Processo registrado com essa Marca');
    }

    const process = await this.processesRepository.create({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    });

    if (process_stage_id) {
      const processStage = await this.processStagesRepository.findById(
        process_stage_id,
      );

      if (processStage) {
        const has_pending = !!processStage.deadline;
        const resolved_pending = false;
        const process_id = process.id;

        const status_pending = has_pending
          ? `Fase do Processo possui prazo de ${processStage.deadline} dias, contanto a partir de ${process.created_at}`
          : '';

        await this.processStatusStagesRepository.create({
          has_pending,
          status_pending,
          resolved_pending,
          process_id,
          process_stage_id,
        });
      }
    }

    return process;
  }
}

export default CreateProcessService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
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

  dispatch_id: string;
}

@injectable()
class CreateProcessService {
  constructor(
    @inject('ProcessesRepository')
    private processesRepository: IProcessRepository,

    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,

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
    dispatch_id,
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

    if (dispatch_id) {
      const dispatch = await this.dispatchsRepository.findById(dispatch_id);

      if (dispatch) {
        const has_pending = !!dispatch.deadline;
        const resolved_pending = false;
        const process_id = process.id;

        const status_pending = has_pending
          ? `Despacho possui prazo de ${dispatch.deadline} dias, contanto a partir de ${process.created_at}`
          : '';

        await this.processStatusStagesRepository.create({
          has_pending,
          status_pending,
          resolved_pending,
          process_id,
          dispatch_id,
        });
      }
    }

    return process;
  }
}

export default CreateProcessService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  number: string;

  brand: string;

  kind: string;

  presentation: string;

  last_update: string;

  birthday: string;

  filed: boolean;

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

    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    filed,
    client_id,
    dispatch_id,
  }: IRequest): Promise<Process> {
    const processWithSameNumber = await this.processesRepository.findByNumber(
      number,
    );

    if (processWithSameNumber) {
      throw new AppError('Já existe um Processo registrado com esse Número');
    }

    const process = await this.processesRepository.create({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    if (dispatch_id) {
      const dispatch = await this.dispatchsRepository.findById(dispatch_id);

      if (dispatch) {
        const dateFormatter = new Date(process.created_at);

        const has_pending = !!dispatch.deadline;
        const resolved_pending = false;
        const publication = dateFormatter.toDateString();
        const complement = '';
        const annotation = '';
        const process_id = process.id;

        const dateLimit = new Date(
          dateFormatter.getFullYear(),
          dateFormatter.getMonth(),
          dateFormatter.getDate() + (dispatch.deadline ?? 0),
        ).toLocaleDateString();

        const status_pending = has_pending
          ? `Despacho possui pendência, com prazo máximo até ${dateLimit}`
          : '';

        await this.processDispatchsRepository.create({
          has_pending,
          status_pending,
          resolved_pending,
          publication,
          complement,
          annotation,
          process_id,
          dispatch_id,
        });

        await this.processesRepository.update({
          id: process.id,
          number,
          brand,
          kind,
          presentation,
          last_update: publication,
          birthday,
          filed,
          client_id,
        });
      }
    }

    return process;
  }
}

export default CreateProcessService;

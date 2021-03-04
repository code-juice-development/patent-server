import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  id: string;

  number: string;

  brand: string;

  kind: string;

  presentation: string;

  last_update: string;

  birthday: string;

  filed: boolean;

  client_id: string;
}

@injectable()
class UpdateProcessService {
  constructor(
    @inject('ProcessesRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute({
    id,
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    filed,
    client_id,
  }: IRequest): Promise<Process> {
    const processWithSameNumber = await this.processRepository.findByNumber(
      number,
    );

    if (processWithSameNumber && processWithSameNumber.id !== id) {
      throw new AppError('Já existe um Processo registrado com esse Número');
    }    

    const process = await this.processRepository.update({
      id,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    return process;
  }
}

export default UpdateProcessService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  number: string;

  brand: string;

  kind: string;

  presentation: string;

  last_update: string;

  birthday: string;

  client_id: string;
}

@injectable()
class CreateProcessService {
  constructor(
    @inject('ProcessesRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    client_id,
  }: IRequest): Promise<Process> {
    const processWithSameNumber = await this.processRepository.findByNumber(
      number,
    );

    if (processWithSameNumber) {
      throw new AppError('Já existe um Processo registrado com esse Número');
    }

    const processWithSameBrand = await this.processRepository.findByBrand(
      brand,
    );

    if (processWithSameBrand) {
      throw new AppError('Já existe um Processo registrado com essa Marca');
    }

    const process = await this.processRepository.create({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    });

    return process;
  }
}

export default CreateProcessService;

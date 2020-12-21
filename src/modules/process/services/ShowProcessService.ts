import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  id: string;
}

@injectable()
class ShowProcessService {
  constructor(
    @inject('ProcessRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Process> {
    const process = await this.processRepository.findById(id);

    if (!process) {
      throw new AppError('Não contrado Processo com o ID informado');
    }

    return process;
  }
}

export default ShowProcessService;

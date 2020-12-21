import { injectable, inject } from 'tsyringe';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

@injectable()
class ListProcessesService {
  constructor(
    @inject('ProcessRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute(): Promise<Process[]> {
    const processes = await this.processRepository.findAll();

    return processes;
  }
}

export default ListProcessesService;

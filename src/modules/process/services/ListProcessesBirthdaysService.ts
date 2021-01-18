import { injectable, inject } from 'tsyringe';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

@injectable()
class ListProcessesBirthdaysService {
  constructor(
    @inject('ProcessesRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute(): Promise<Process[]> {
    const processes = await this.processRepository.findAllBirthdays();

    return processes;
  }
}

export default ListProcessesBirthdaysService;

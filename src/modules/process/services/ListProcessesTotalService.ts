import { injectable, inject } from 'tsyringe';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

@injectable()
class ListProcessesTotalService {
  constructor(
    @inject('ProcessesRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute(): Promise<number> {
    const count = await this.processRepository.countAll();

    return count;
  }
}

export default ListProcessesTotalService;

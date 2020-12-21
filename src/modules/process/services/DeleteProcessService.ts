import { injectable, inject } from 'tsyringe';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProcessService {
  constructor(
    @inject('ProcessRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.processRepository.delete(id);
  }
}

export default DeleteProcessService;

import { injectable, inject } from 'tsyringe';

import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProcessStageService {
  constructor(
    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.processStagesRepository.delete(id);
  }
}

export default DeleteProcessStageService;

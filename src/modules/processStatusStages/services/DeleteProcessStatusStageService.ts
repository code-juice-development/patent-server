import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.processStatusStagesRepository.delete(id);
  }
}

export default DeleteProcessStatusStageService;

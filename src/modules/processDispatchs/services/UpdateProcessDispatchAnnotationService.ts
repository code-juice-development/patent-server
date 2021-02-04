import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  id: string;

  annotation: string;
}

@injectable()
class UpdateProcessDispatchAnnotationService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({ id, annotation }: IRequest): Promise<ProcessDispatch> {
    const processDispatch = await this.processDispatchsRepository.updateAnnotation(
      id,
      annotation,
    );

    return processDispatch;
  }
}

export default UpdateProcessDispatchAnnotationService;

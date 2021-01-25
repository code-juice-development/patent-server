import { injectable, inject } from 'tsyringe';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteDispatchService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    await this.dispatchsRepository.delete(id);
  }
}

export default DeleteDispatchService;

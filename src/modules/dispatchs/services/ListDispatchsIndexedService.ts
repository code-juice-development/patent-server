import { injectable, inject } from 'tsyringe';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  name: string | null;

  code: string | null;

  description: string | null;

  deadline: string | null;

  send_message: boolean | null;

  send_email: boolean | null;
}

interface IResponse {
  total: number;

  dispatchs: Dispatch[];
}

@injectable()
class ListDispatchsIndexedService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    name,
    code,
    description,
    deadline,
    send_message,
    send_email,
  }: IRequest): Promise<IResponse> {
    const { total, dispatchs } = await this.dispatchsRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: { name, code, description, deadline, send_message, send_email },
    });

    return { total, dispatchs };
  }
}

export default ListDispatchsIndexedService;

import { injectable, inject } from 'tsyringe';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';

import Process from '@modules/process/infra/typeorm/entities/Process';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  number: string | null;

  brand: string | null;

  kind: string | null;

  presentation: string | null;

  last_update: string | null;

  birthday: string | null;

  client_id: string | null;
}

interface IResponse {
  total: number;

  processes: Process[];
}

@injectable()
class ListProcessesIndexedService {
  constructor(
    @inject('ProcessesRepository')
    private processRepository: IProcessRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    client_id,
  }: IRequest): Promise<IResponse> {
    const { total, processes } = await this.processRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: {
        number,
        brand,
        kind,
        presentation,
        last_update,
        birthday,
        client_id,
      },
    });

    return { total, processes };
  }
}

export default ListProcessesIndexedService;

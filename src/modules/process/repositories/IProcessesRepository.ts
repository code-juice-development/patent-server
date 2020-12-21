import ICreateProcessDTO from '@modules/process/dtos/ICreateProcessDTO';
import IUpdateProcessDTO from '@modules/process/dtos/IUpdateProcessDTO';

import Process from '@modules/process/infra/typeorm/entities/Process';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    number: string | null;

    brand: string | null;

    kind: string | null;

    presentation: string | null;

    last_update: string | null;

    birthday: string | null;

    client_id: string | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  processes: Process[];
}

interface IProcessRepository {
  create(data: ICreateProcessDTO): Promise<Process>;

  update(data: IUpdateProcessDTO): Promise<Process>;

  delete(id: string): Promise<void>;

  findAll(): Promise<Process[]>;

  findById(id: string): Promise<Process | undefined>;

  findByNumber(number: string): Promise<Process | undefined>;

  findByBrand(brand: string): Promise<Process | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;
}

export default IProcessRepository;

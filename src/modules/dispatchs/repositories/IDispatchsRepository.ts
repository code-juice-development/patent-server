import ICreateDispatchsDTO from '@modules/dispatchs/dtos/ICreateDispatchsDTO';
import IUpdateDispatchsDTO from '@modules/dispatchs/dtos/IUpdateDispatchsDTO';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    name: string | null;

    code: string | null;

    description: string | null;

    deadline: number | null;

    send_message: boolean | null;

    send_email: boolean | null;

    after_sale: number | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  dispatchs: Dispatch[];
}

interface IDispatchsRepository {
  create(data: ICreateDispatchsDTO): Promise<Dispatch>;

  update(data: IUpdateDispatchsDTO): Promise<Dispatch>;

  delete(id: string): Promise<void>;

  findAll(): Promise<Dispatch[]>;

  findById(id: string): Promise<Dispatch | undefined>;

  findByName(name: string): Promise<Dispatch | undefined>;

  findByCode(code: string): Promise<Dispatch | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;
}

export default IDispatchsRepository;

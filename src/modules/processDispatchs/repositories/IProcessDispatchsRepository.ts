import ICreateProcessDispatchDTO from '@modules/processDispatchs/dtos/ICreateProcessDispatchDTO';
import IUpdateProcessDispatchDTO from '@modules/processDispatchs/dtos/IUpdateProcessDispatchDTO';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    has_pending: boolean | null;

    resolved_pending: boolean | null;

    process_id: string | null;

    dispatch_id: string | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  process_dispatchs: ProcessDispatch[];
}

interface IProcessDispatchsRepository {
  create(data: ICreateProcessDispatchDTO): Promise<ProcessDispatch>;

  update(data: IUpdateProcessDispatchDTO): Promise<ProcessDispatch>;

  updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessDispatch>;

  delete(id: string): Promise<void>;

  findAll(): Promise<ProcessDispatch[]>;

  findById(id: string): Promise<ProcessDispatch | undefined>;

  findByProcessId(process_id: string): Promise<ProcessDispatch[]>;

  findByDispatchId(dispatch_id: string): Promise<ProcessDispatch[]>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;

  findDispatchPendentActualTotal(dispatch_id: string): Promise<number>;

  findDispatchResolvedActualTotal(dispatch_id: string): Promise<number>;
}

export default IProcessDispatchsRepository;

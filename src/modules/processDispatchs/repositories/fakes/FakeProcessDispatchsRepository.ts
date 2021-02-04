import { v4 } from 'uuid';

import IProcessDispatchsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ICreateProcessDispatchDTO from '@modules/processDispatchs/dtos/ICreateProcessDispatchDTO';
import IUpdateProcessDispatchDTO from '@modules/processDispatchs/dtos/IUpdateProcessDispatchDTO';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

class FakeProcessDispatchsRepository implements IProcessDispatchsRepository {
  private processDispatchs: ProcessDispatch[];

  constructor() {
    this.processDispatchs = [];
  }

  public async create({
    has_pending,
    status_pending,
    resolved_pending,
    publication,
    complement,
    annotation,
    process_id,
    dispatch_id,
  }: ICreateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = new ProcessDispatch();

    const id = v4();

    Object.assign(processDispatch, {
      id,
      has_pending,
      status_pending,
      resolved_pending,
      publication,
      complement,
      annotation,
      process_id,
      dispatch_id,
    });

    this.processDispatchs.push(processDispatch);

    return processDispatch;
  }

  public async update({
    id,
    has_pending,
    status_pending,
    resolved_pending,
    publication,
    complement,
    annotation,
    process_id,
    dispatch_id,
  }: IUpdateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = this.processDispatchs.find(
      (actualProcessDispatch) => actualProcessDispatch.id === id,
    );

    Object.assign(processDispatch, {
      has_pending,
      status_pending,
      resolved_pending,
      publication,
      complement,
      annotation,
      process_id,
      dispatch_id,
    });

    return processDispatch ?? new ProcessDispatch();
  }

  public async updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessDispatch> {
    const processDispatch = this.processDispatchs.find(
      (actualProcessDispatch) => actualProcessDispatch.id === id,
    );

    Object.assign(processDispatch, {
      resolved_pending,
    });

    return processDispatch ?? new ProcessDispatch();
  }

  public async updateAnnotation(
    id: string,
    annotation: string,
  ): Promise<ProcessDispatch> {
    const processDispatch = this.processDispatchs.find(
      (actualProcessDispatch) => actualProcessDispatch.id === id,
    );

    Object.assign(processDispatch, {
      annotation,
    });

    return processDispatch ?? new ProcessDispatch();
  }

  public async delete(id: string): Promise<void> {
    this.processDispatchs = this.processDispatchs.filter(
      (actualProcessDispatch) => actualProcessDispatch.id !== id,
    );
  }

  public async findAll(): Promise<ProcessDispatch[]> {
    return this.processDispatchs;
  }

  public async findById(id: string): Promise<ProcessDispatch | undefined> {
    const processDispatch = this.processDispatchs.find(
      (actualProcessDispatch) => actualProcessDispatch.id === id,
    );

    return processDispatch;
  }

  public async findByProcessId(process_id: string): Promise<ProcessDispatch[]> {
    const processDispatchs = this.processDispatchs.filter(
      (actualProcessDispatch) =>
        actualProcessDispatch.process_id === process_id,
    );

    return processDispatchs;
  }

  public async findByDispatchId(
    dispatch_id: string,
  ): Promise<ProcessDispatch[]> {
    const processDispatchs = this.processDispatchs.filter(
      (actualProcessDispatch) =>
        actualProcessDispatch.dispatch_id === dispatch_id,
    );

    return processDispatchs;
  }

  public async findByProcessDispatchId(
    process_id: string,
    dispatch_id: string,
  ): Promise<ProcessDispatch[]> {
    const processDispatchs = this.processDispatchs.filter(
      (actualProcessDispatch) =>
        actualProcessDispatch.process_id === process_id &&
        actualProcessDispatch.dispatch_id === dispatch_id,
    );

    return processDispatchs;
  }

  /**
   * @todo Include ordering
   */
  public async findIndexed({
    page,
    rows,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const { has_pending, resolved_pending, process_id, dispatch_id } = filter;

    const total = this.processDispatchs.length;

    const filteredProcessDispatchs = this.processDispatchs.filter(
      (processDispatch) => {
        if (has_pending != null && processDispatch.has_pending !== has_pending)
          return false;
        if (
          resolved_pending != null &&
          processDispatch.resolved_pending !== resolved_pending
        )
          return false;
        if (process_id != null && processDispatch.process_id !== process_id)
          return false;
        if (dispatch_id != null && processDispatch.dispatch_id !== dispatch_id)
          return false;

        return true;
      },
    );

    const process_dispatchs = filteredProcessDispatchs.slice(page * rows, rows);

    return { total, process_dispatchs };
  }
}

export default FakeProcessDispatchsRepository;

import { Repository, getRepository } from 'typeorm';

import IProcessDispatchsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ICreateProcessDispatchDTO from '@modules/processDispatchs/dtos/ICreateProcessDispatchDTO';
import IUpdateProcessDispatchDTO from '@modules/processDispatchs/dtos/IUpdateProcessDispatchDTO';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

class ProcessDispatchsRepository implements IProcessDispatchsRepository {
  private repository: Repository<ProcessDispatch>;

  constructor() {
    this.repository = getRepository(ProcessDispatch);
  }

  public async create({
    has_pending,
    status_pending,
    resolved_pending,
    publication,
    process_id,
    dispatch_id,
  }: ICreateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = this.repository.create({
      has_pending,
      status_pending,
      resolved_pending,
      publication,
      process_id,
      dispatch_id,
    });

    await this.repository.save(processDispatch);

    return processDispatch;
  }

  public async update({
    id,
    has_pending,
    status_pending,
    resolved_pending,
    publication,
    process_id,
    dispatch_id,
  }: IUpdateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = this.repository.create({
      id,
      has_pending,
      status_pending,
      resolved_pending,
      publication,
      process_id,
      dispatch_id,
    });

    await this.repository.save(processDispatch);

    return processDispatch;
  }

  public async updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessDispatch> {
    const processDispatch = this.repository.create({
      id,
      resolved_pending,
    });

    await this.repository.save(processDispatch);

    return processDispatch;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<ProcessDispatch[]> {
    const processDispatchs = await this.repository.find();

    return processDispatchs;
  }

  public async findById(id: string): Promise<ProcessDispatch | undefined> {
    const processDispatch = this.repository.findOne(
      { id },
      {
        relations: ['dispatch'],
      },
    );

    return processDispatch;
  }

  public async findByProcessId(process_id: string): Promise<ProcessDispatch[]> {
    const processDispatchs = this.repository.find({
      where: { process_id },
      relations: ['dispatch'],
    });

    return processDispatchs;
  }

  public async findByDispatchId(
    dispatch_id: string,
  ): Promise<ProcessDispatch[]> {
    const processDispatchs = this.repository.find({
      where: { dispatch_id },
      relations: ['dispatch'],
    });

    return processDispatchs;
  }

  public async findByProcessDispatchId(
    process_id: string,
    dispatch_id: string,
  ): Promise<ProcessDispatch[]> {
    const processDispatchs = this.repository.find({
      where: { process_id, dispatch_id },
      relations: ['dispatch'],
    });

    return processDispatchs;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('process_dispatch');

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1] !== null),
    );

    queryBuilder
      .innerJoinAndSelect('process_dispatch.dispatch', 'dispatchs')
      .where(filters)
      .orderBy(`process_dispatch.${ordenation}`);

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [process_dispatchs, total] = await queryBuilder.getManyAndCount();

    return { total, process_dispatchs };
  }
}

export default ProcessDispatchsRepository;

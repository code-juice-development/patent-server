import { Repository, getRepository, Brackets } from 'typeorm';

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
    process_id,
    dispatch_id,
  }: ICreateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = this.repository.create({
      has_pending,
      status_pending,
      resolved_pending,
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
    process_id,
    dispatch_id,
  }: IUpdateProcessDispatchDTO): Promise<ProcessDispatch> {
    const processDispatch = this.repository.create({
      id,
      has_pending,
      status_pending,
      resolved_pending,
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

  public async findDispatchPendentActualTotal(
    dispatch_id: string,
  ): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder('process_dispatch');

    queryBuilder
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_dispatch.id')
          .from(ProcessDispatch, 'process_dispatch')
          .where('process_dispatch.dispatch_id = :dispatch_id')
          .orderBy(
            'process_dispatch.process_id, process_dispatch.created_at',
            'DESC',
          )
          .distinctOn(['process_dispatch.process_id'])
          .getQuery();

        return `process_dispatch.id IN (${subQuery})`;
      })
      .andWhere(
        new Brackets((we) => {
          we.where('has_pending = true').andWhere('resolved_pending = false');
        }),
      )
      .setParameter('dispatch_id', dispatch_id);

    const amount = (await queryBuilder.getMany()).length;

    return amount;
  }

  public async findDispatchResolvedActualTotal(
    dispatch_id: string,
  ): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder('process_dispatch');

    queryBuilder
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_dispatch.id')
          .from(ProcessDispatch, 'process_dispatch')
          .where('process_dispatch.dispatch_id = :dispatch_id')
          .orderBy(
            'process_dispatch.process_id, process_dispatch.created_at',
            'DESC',
          )
          .distinctOn(['process_dispatch.process_id'])
          .getQuery();

        return `process_dispatch.id IN (${subQuery})`;
      })
      .andWhere(
        new Brackets((we) => {
          we.where('has_pending = false').orWhere(
            new Brackets((we2) => {
              we2
                .where('has_pending = true')
                .andWhere('resolved_pending = true');
            }),
          );
        }),
      )
      .setParameter('dispatch_id', dispatch_id);

    const amount = (await queryBuilder.getMany()).length;

    return amount;
  }
}

export default ProcessDispatchsRepository;

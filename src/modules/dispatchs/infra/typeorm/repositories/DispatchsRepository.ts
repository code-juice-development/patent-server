import { Repository, getRepository, Brackets } from 'typeorm';

import IDispatchsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
  IDispatchTotal,
} from '@modules/dispatchs/repositories/IDispatchsRepository';

import ICreateDispatchsDTO from '@modules/dispatchs/dtos/ICreateDispatchsDTO';
import IUpdateDispatchsDTO from '@modules/dispatchs/dtos/IUpdateDispatchsDTO';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';
import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';
import Process from '@modules/process/infra/typeorm/entities/Process';

class DispatchsRepository implements IDispatchsRepository {
  private repository: Repository<Dispatch>;

  constructor() {
    this.repository = getRepository(Dispatch);
  }

  public async create({
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
    after_sale,
  }: ICreateDispatchsDTO): Promise<Dispatch> {
    const dispatch = this.repository.create({
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
      after_sale,
    });

    await this.repository.save(dispatch);

    return dispatch;
  }

  public async update({
    id,
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
    after_sale,
  }: IUpdateDispatchsDTO): Promise<Dispatch> {
    const dispatch = this.repository.create({
      id,
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
      after_sale,
    });

    await this.repository.save(dispatch);

    return dispatch;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<Dispatch[]> {
    const dispatchs = await this.repository.find();

    return dispatchs;
  }

  public async findById(id: string): Promise<Dispatch | undefined> {
    const dispatch = await this.repository.findOne(id);

    return dispatch;
  }

  public async findByName(name: string): Promise<Dispatch | undefined> {
    const dispatch = await this.repository.findOne({ name });

    return dispatch;
  }

  public async findByCode(code: string): Promise<Dispatch | undefined> {
    const dispatch = await this.repository.findOne({ code });

    return dispatch;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('dispatchs');

    const { description } = filter;

    const filters = Object.fromEntries(
      Object.entries(filter).filter(
        (actualFilter) =>
          actualFilter[1] !== null &&
          !['description'].includes(actualFilter[0]),
      ),
    );

    queryBuilder.where(filters).orderBy(ordenation);

    if (description) {
      description.split(' ').forEach((word) =>
        queryBuilder.andWhere(
          `translate(lower(dispatchs.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${word}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
        ),
      );
    }

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [dispatchs, total] = await queryBuilder.getManyAndCount();

    return { total, dispatchs };
  }

  public async findDispatchTotal(): Promise<IDispatchTotal[]> {
    const queryBuilder = this.repository.createQueryBuilder('dispatch');

    queryBuilder
      .select('dispatch')
      .addSelect('COUNT(process_dispatch)', 'total')
      .addSelect('null', 'date')
      .innerJoin(
        ProcessDispatch,
        'process_dispatch',
        'dispatch.id = process_dispatch.dispatch_id',
      )
      .innerJoin(
        Process,
        'process',
        'process_dispatch.process_id = process.id and process_dispatch.publication = process.last_update',
      )
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_dispatch.id')
          .distinctOn(['process_dispatch.process_id'])
          .from(ProcessDispatch, 'process_dispatch')
          .orderBy(
            'process_dispatch.process_id, process_dispatch.created_at',
            'DESC',
          )
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
      .groupBy('dispatch.id')
      .addGroupBy('dispatch.name')
      .addGroupBy('dispatch.code')
      .addGroupBy('dispatch.description')
      .addGroupBy('dispatch.deadline')
      .addGroupBy('dispatch.send_message')
      .addGroupBy('dispatch.model_message')
      .addGroupBy('dispatch.send_email')
      .addGroupBy('dispatch.model_email')
      .addGroupBy('dispatch.after_sale')
      .addGroupBy('dispatch.created_at')
      .addGroupBy('dispatch.updated_at');

    const results = await queryBuilder.getRawMany();

    const process_dispatch_totals = results.map(
      ({
        dispatch_id,
        dispatch_name,
        dispatch_code,
        dispatch_description,
        dispatch_deadline,
        dispatch_send_message,
        dispatch_model_message,
        dispatch_send_email,
        dispatch_model_email,
        dispatch_after_sale,
        dispatch_created_at,
        dispatch_updated_at,
        total,
        date,
      }) => {
        const dispatch = new Dispatch();

        Object.assign(dispatch, {
          id: dispatch_id,
          name: dispatch_name,
          code: dispatch_code,
          description: dispatch_description,
          deadline: dispatch_deadline,
          send_message: dispatch_send_message,
          model_message: dispatch_model_message,
          send_email: dispatch_send_email,
          model_email: dispatch_model_email,
          after_sale: dispatch_after_sale,
          created_at: dispatch_created_at,
          updated_at: dispatch_updated_at,
        });

        return { dispatch, total, date };
      },
    );

    return process_dispatch_totals;
  }

  public async findDispatchTotalPendent(): Promise<IDispatchTotal[]> {
    const queryBuilder = this.repository.createQueryBuilder('dispatch');

    queryBuilder
      .select('dispatch')
      .addSelect('COUNT(process_dispatch)', 'total')
      .addSelect(
        "process_dispatch.publication + interval '1' day * CAST(dispatch.deadline AS float)",
        'date',
      )
      .innerJoin(
        ProcessDispatch,
        'process_dispatch',
        'dispatch.id = process_dispatch.dispatch_id',
      )
      .innerJoin(
        Process,
        'process',
        'process_dispatch.process_id = process.id and process_dispatch.publication = process.last_update',
      )
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_dispatch.id')
          .distinctOn(['process_dispatch.process_id'])
          .from(ProcessDispatch, 'process_dispatch')
          .orderBy(
            'process_dispatch.process_id, process_dispatch.created_at',
            'DESC',
          )
          .getQuery();

        return `process_dispatch.id IN (${subQuery})`;
      })
      .andWhere(
        new Brackets((we) => {
          we.where('has_pending = true').andWhere('resolved_pending = false');
        }),
      )
      .groupBy('dispatch.id')
      .addGroupBy('dispatch.name')
      .addGroupBy('dispatch.code')
      .addGroupBy('dispatch.description')
      .addGroupBy('dispatch.deadline')
      .addGroupBy('dispatch.send_message')
      .addGroupBy('dispatch.model_message')
      .addGroupBy('dispatch.send_email')
      .addGroupBy('dispatch.model_email')
      .addGroupBy('dispatch.after_sale')
      .addGroupBy('dispatch.created_at')
      .addGroupBy('dispatch.updated_at')
      .addGroupBy('process_dispatch.publication')
      .orderBy('process_dispatch.publication');

    const results = await queryBuilder.getRawMany();

    const process_dispatch_totals = results.map(
      ({
        dispatch_id,
        dispatch_name,
        dispatch_code,
        dispatch_description,
        dispatch_deadline,
        dispatch_send_message,
        dispatch_model_message,
        dispatch_send_email,
        dispatch_model_email,
        dispatch_after_sale,
        dispatch_created_at,
        dispatch_updated_at,
        total,
        date,
      }) => {
        const dispatch = new Dispatch();

        Object.assign(dispatch, {
          id: dispatch_id,
          name: dispatch_name,
          code: dispatch_code,
          description: dispatch_description,
          deadline: dispatch_deadline,
          send_message: dispatch_send_message,
          model_message: dispatch_model_message,
          send_email: dispatch_send_email,
          model_email: dispatch_model_email,
          after_sale: dispatch_after_sale,
          created_at: dispatch_created_at,
          updated_at: dispatch_updated_at,
        });

        return { dispatch, total, date };
      },
    );

    return process_dispatch_totals;
  }

  public async findDispatchTotalAfterSale(): Promise<IDispatchTotal[]> {
    const actualDate = new Date().toDateString();

    const queryBuilder = this.repository.createQueryBuilder('dispatch');

    queryBuilder
      .select('dispatch')
      .addSelect('COUNT(process_dispatch)', 'total')
      .addSelect(
        "process_dispatch.publication + interval '1' month * CAST(dispatch.after_sale AS float)",
        'date',
      )
      .innerJoin(
        ProcessDispatch,
        'process_dispatch',
        'dispatch.id = process_dispatch.dispatch_id',
      )
      .innerJoin(
        Process,
        'process',
        'process_dispatch.process_id = process.id and process_dispatch.publication = process.last_update',
      )
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_dispatch.id')
          .distinctOn(['process_dispatch.process_id'])
          .from(ProcessDispatch, 'process_dispatch')
          .orderBy(
            'process_dispatch.process_id, process_dispatch.created_at',
            'DESC',
          )
          .getQuery();

        return `process_dispatch.id IN (${subQuery})`;
      })
      .andWhere('CAST(after_sale AS float) > 0')
      .andWhere(
        `CAST('${actualDate}' AS date) >= (process_dispatch.publication + interval '1' month * CAST(dispatch.after_sale AS float))`,
      )
      .groupBy('dispatch.id')
      .addGroupBy('dispatch.name')
      .addGroupBy('dispatch.code')
      .addGroupBy('dispatch.description')
      .addGroupBy('dispatch.deadline')
      .addGroupBy('dispatch.send_message')
      .addGroupBy('dispatch.model_message')
      .addGroupBy('dispatch.send_email')
      .addGroupBy('dispatch.model_email')
      .addGroupBy('dispatch.after_sale')
      .addGroupBy('dispatch.created_at')
      .addGroupBy('dispatch.updated_at')
      .addGroupBy('process_dispatch.publication')
      .orderBy('process_dispatch.publication');

    const results = await queryBuilder.getRawMany();

    const process_dispatch_totals = results.map(
      ({
        dispatch_id,
        dispatch_name,
        dispatch_code,
        dispatch_description,
        dispatch_deadline,
        dispatch_send_message,
        dispatch_model_message,
        dispatch_send_email,
        dispatch_model_email,
        dispatch_after_sale,
        dispatch_created_at,
        dispatch_updated_at,
        total,
        date,
      }) => {
        const dispatch = new Dispatch();

        Object.assign(dispatch, {
          id: dispatch_id,
          name: dispatch_name,
          code: dispatch_code,
          description: dispatch_description,
          deadline: dispatch_deadline,
          send_message: dispatch_send_message,
          model_message: dispatch_model_message,
          send_email: dispatch_send_email,
          model_email: dispatch_model_email,
          after_sale: dispatch_after_sale,
          created_at: dispatch_created_at,
          updated_at: dispatch_updated_at,
        });

        return { dispatch, total, date };
      },
    );

    return process_dispatch_totals;
  }
}

export default DispatchsRepository;

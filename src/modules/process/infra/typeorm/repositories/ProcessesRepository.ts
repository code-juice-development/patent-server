import { Repository, getRepository, Brackets } from 'typeorm';

import IProcessRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/process/repositories/IProcessesRepository';

import ICreateProcessDTO from '@modules/process/dtos/ICreateProcessDTO';
import IUpdateProcessDTO from '@modules/process/dtos/IUpdateProcessDTO';

import Process from '@modules/process/infra/typeorm/entities/Process';
import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

class ProcessesRepository implements IProcessRepository {
  private repository: Repository<Process>;

  constructor() {
    this.repository = getRepository(Process);
  }

  public async create({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    filed,
    client_id,
  }: ICreateProcessDTO): Promise<Process> {
    const process = this.repository.create({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    await this.repository.save(process);

    return process;
  }

  public async update({
    id,
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    filed,
    client_id,
  }: IUpdateProcessDTO): Promise<Process> {
    const process = this.repository.create({
      id,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    await this.repository.save(process);

    return process;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<Process[]> {
    const processes = await this.repository.find();

    return processes;
  }

  public async findAllBirthdays(): Promise<Process[]> {
    const queryBuilder = this.repository.createQueryBuilder('process');

    queryBuilder
      .where(
        "extract('day' from cast(process.birthday as date)) = extract('day' from (select CURRENT_DATE))",
      )
      .andWhere(
        "extract('month' from cast(process.birthday as date)) = extract('month' from (select CURRENT_DATE))",
      )
      .andWhere(
        "extract('year' from cast(process.birthday as date)) < extract('year' from (select CURRENT_DATE))",
      );

    const processes = queryBuilder.getMany();

    return processes;
  }

  public async findById(id: string): Promise<Process | undefined> {
    const process = await this.repository.findOne({ id });

    return process;
  }

  public async findByNumber(number: string): Promise<Process | undefined> {
    const process = await this.repository.findOne({ number });

    return process;
  }

  public async findByBrand(brand: string): Promise<Process | undefined> {
    const process = await this.repository.findOne({ brand });

    return process;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('process');

    const { birthday, last_update } = filter;

    const { pendent } = filter;

    const filters = Object.fromEntries(
      Object.entries(filter).filter(
        (actualFilter) =>
          actualFilter[1] !== null &&
          !['pendent', 'birthday', 'last_update'].includes(actualFilter[0]),
      ),
    );

    queryBuilder.where(filters);

    if (pendent !== null) {
      queryBuilder.andWhere((subQueryBuilder) => {
        const subQuery = subQueryBuilder
          .subQuery()
          .select('process_id', 'process_dispatch_process_id')
          .from(ProcessDispatch, 'process_dispatch')
          .innerJoin(
            (subQueryBuilder2) => {
              subQueryBuilder2
                .select('MAX("created_at")', 'process_dispatch2_created_at')
                .addSelect('id', 'process_dispatch2_id')
                .from(ProcessDispatch, 'process_dispatch2')
                .groupBy('id');

              return subQueryBuilder2;
            },
            'process_dispatch2',
            'process_dispatch2_id = id',
          );

        if (pendent) {
          subQuery
            .where('has_pending = true')
            .andWhere('resolved_pending = false');
        } else {
          subQuery.where('has_pending = false').orWhere(
            new Brackets((backetSubQueryBuilder) => {
              backetSubQueryBuilder
                .where('has_pending = true')
                .andWhere('resolved_pending = true');
            }),
          );
        }

        subQuery.groupBy('process_dispatch_process_id');

        const query = subQuery.getQuery();

        return `process.id IN (${query})`;
      });
    }

    if (birthday) {
      queryBuilder.andWhere(
        'cast(process.birthday as date) = cast(:birthday as date)',
      );
      queryBuilder.setParameter('birthday', birthday);
    }

    if (last_update) {
      queryBuilder.andWhere(
        'cast(process.last_update as date) = cast(:last_update as date)',
      );
      queryBuilder.setParameter('last_update', last_update);
    }

    queryBuilder
      .innerJoinAndSelect('process.client', 'clients')
      .orderBy(`process.${ordenation}`);

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [processes, total] = await queryBuilder.getManyAndCount();

    return { total, processes };
  }
}

export default ProcessesRepository;

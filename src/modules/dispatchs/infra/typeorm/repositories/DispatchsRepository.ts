import { Repository, getRepository } from 'typeorm';

import IDispatchsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/dispatchs/repositories/IDispatchsRepository';

import ICreateDispatchsDTO from '@modules/dispatchs/dtos/ICreateDispatchsDTO';
import IUpdateDispatchsDTO from '@modules/dispatchs/dtos/IUpdateDispatchsDTO';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

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

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1] !== null),
    );

    queryBuilder.where(filters).orderBy(ordenation);

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [dispatchs, total] = await queryBuilder.getManyAndCount();

    return { total, dispatchs };
  }
}

export default DispatchsRepository;

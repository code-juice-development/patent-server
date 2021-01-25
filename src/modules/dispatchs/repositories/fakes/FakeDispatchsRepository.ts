import { v4 } from 'uuid';

import IDispatchsRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/dispatchs/repositories/IDispatchsRepository';

import ICreateDispatchsDTO from '@modules/dispatchs/dtos/ICreateDispatchsDTO';
import IUpdateDispatchsDTO from '@modules/dispatchs/dtos/IUpdateDispatchsDTO';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

class DispatchsRepository implements IDispatchsRepository {
  private dispatchs: Dispatch[];

  constructor() {
    this.dispatchs = [];
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
    const dispatch = new Dispatch();

    const id = v4();

    Object.assign(dispatch, {
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

    this.dispatchs.push(dispatch);

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
    const dispatch = this.dispatchs.find(
      (actualDispatch) => actualDispatch.id === id,
    );

    Object.assign(dispatch, {
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    return dispatch ?? new Dispatch();
  }

  public async delete(id: string): Promise<void> {
    this.dispatchs = this.dispatchs.filter((dispatch) => dispatch.id !== id);
  }

  public async findAll(): Promise<Dispatch[]> {
    return this.dispatchs;
  }

  public async findById(id: string): Promise<Dispatch | undefined> {
    const dispatch = this.dispatchs.find(
      (actualDispatch) => actualDispatch.id === id,
    );

    return dispatch;
  }

  public async findByName(name: string): Promise<Dispatch | undefined> {
    const dispatch = this.dispatchs.find(
      (actualDispatch) => actualDispatch.name === name,
    );

    return dispatch;
  }

  public async findByCode(code: string): Promise<Dispatch | undefined> {
    const dispatch = this.dispatchs.find(
      (actualDispatch) => actualDispatch.code === code,
    );

    return dispatch;
  }

  /**
   * @todo Include ordering
   */
  public async findIndexed({
    page,
    rows,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const {
      name,
      code,
      description,
      deadline,
      send_message,
      send_email,
    } = filter;

    const total = this.dispatchs.length;

    const filteredDispatchs = this.dispatchs.filter((dispatch) => {
      if (name !== null && dispatch.name !== name) return false;
      if (code !== null && dispatch.code !== code) return false;
      if (description !== null && dispatch.description !== description)
        return false;
      if (deadline !== null && dispatch.deadline !== deadline) return false;
      if (send_message !== null && dispatch.send_message !== send_message)
        return false;
      if (send_email !== null && dispatch.send_email !== send_email)
        return false;

      return true;
    });

    const dispatchs = filteredDispatchs.slice(page * rows, rows);

    return { total, dispatchs };
  }
}

export default DispatchsRepository;

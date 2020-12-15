import { v4 } from 'uuid';

import IProcessStagesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processStages/repositories/IProcessStagesRepository';

import ICreateProcessStagesDTO from '@modules/processStages/dtos/ICreateProcessStagesDTO';
import IUpdateProcessStagesDTO from '@modules/processStages/dtos/IUpdateProcessStagesDTO';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

class ClientsRepository implements IProcessStagesRepository {
  private processStages: ProcessStage[];

  constructor() {
    this.processStages = [];
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
  }: ICreateProcessStagesDTO): Promise<ProcessStage> {
    const processStage = new ProcessStage();

    const id = v4();

    Object.assign(processStage, {
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

    this.processStages.push(processStage);

    return processStage;
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
  }: IUpdateProcessStagesDTO): Promise<ProcessStage> {
    const processStage = this.processStages.find(
      (actualProcessStage) => actualProcessStage.id === id,
    );

    Object.assign(processStage, {
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    return processStage ?? new ProcessStage();
  }

  public async delete(id: string): Promise<void> {
    this.processStages = this.processStages.filter(
      (processStage) => processStage.id !== id,
    );
  }

  public async findAll(): Promise<ProcessStage[]> {
    return this.processStages;
  }

  public async findById(id: string): Promise<ProcessStage | undefined> {
    const processStage = this.processStages.find(
      (actualProcessStage) => actualProcessStage.id === id,
    );

    return processStage;
  }

  public async findByName(name: string): Promise<ProcessStage | undefined> {
    const processStage = this.processStages.find(
      (actualProcessStage) => actualProcessStage.name === name,
    );

    return processStage;
  }

  public async findByCode(code: string): Promise<ProcessStage | undefined> {
    const processStage = this.processStages.find(
      (actualProcessStage) => actualProcessStage.code === code,
    );

    return processStage;
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

    const total = this.processStages.length;

    const filteredProcessStages = this.processStages.filter((processStage) => {
      if (name && processStage.name !== name) return false;
      if (code && processStage.code !== code) return false;
      if (description && processStage.description !== description) return false;
      if (deadline && processStage.deadline !== deadline) return false;
      if (send_message && processStage.send_message !== send_message)
        return false;
      if (send_email && processStage.send_email !== send_email) return false;

      return true;
    });

    const processStages = filteredProcessStages.slice(page * rows, rows);

    return { total, processStages };
  }
}

export default ClientsRepository;

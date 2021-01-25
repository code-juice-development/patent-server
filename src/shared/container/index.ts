import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import DispatchsRepository from '@modules/dispatchs/infra/typeorm/repositories/DispatchsRepository';

import IProcessRepository from '@modules/process/repositories/IProcessesRepository';
import ProcessesRepository from '@modules/process/infra/typeorm/repositories/ProcessesRepository';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';
import ProcessStatusStagesRepository from '@modules/processStatusStages/infra/typeorm/repositories/ProcessStatusStagesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IDispatchsRepository>(
  'DispatchsRepository',
  DispatchsRepository,
);

container.registerSingleton<IProcessRepository>(
  'ProcessesRepository',
  ProcessesRepository,
);

container.registerSingleton<IProcessStatusStagesRepository>(
  'ProcessStatusStagesRepository',
  ProcessStatusStagesRepository,
);

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

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';
import ProcessDispatchsRepository from '@modules/processDispatchs/infra/typeorm/repositories/ProcessDispatchsRepository';

import IProcessUpdatesRepository from '@modules/processUpdates/repositories/IProcessUpdatesRepository';
import ProcessUpdatesRepository from '@modules/processUpdates/infra/typeorm/repositories/ProcessUpdatesRepository';

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

container.registerSingleton<IProcessDispatchsRepository>(
  'ProcessDispatchsRepository',
  ProcessDispatchsRepository,
);

container.registerSingleton<IProcessUpdatesRepository>(
  'ProcessUpdatesRepository',
  ProcessUpdatesRepository,
);

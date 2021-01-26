import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import dispatchsRouter from '@modules/dispatchs/infra/http/routes/dispatchs.routes';
import processRouter from '@modules/process/infra/http/routes/processes.routes';
import processDispatchs from '@modules/processDispatchs/infra/http/routes/processDispatchs.routes';
import processUpdates from '@modules/processUpdates/infra/http/routes/processUpdates.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/dispatchs', dispatchsRouter);
routes.use('/processes', processRouter);
routes.use('/process-dispatchs', processDispatchs);
routes.use('/process-updates', processUpdates);

export default routes;

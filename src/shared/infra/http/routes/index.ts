import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import clientsPublicRouter from '@modules/clients/infra/http/routes/clientsPublic.routes';
import dispatchsRouter from '@modules/dispatchs/infra/http/routes/dispatchs.routes';
import processRouter from '@modules/process/infra/http/routes/processes.routes';
import processesPublicRouter from '@modules/process/infra/http/routes/processesPublic.routes';
import processDispatchsRouter from '@modules/processDispatchs/infra/http/routes/processDispatchs.routes';
import processUpdatesRouter from '@modules/processUpdates/infra/http/routes/processUpdates.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/dispatchs', dispatchsRouter);
routes.use('/processes', processRouter);
routes.use('/process-dispatchs', processDispatchsRouter);
routes.use('/process-updates', processUpdatesRouter);

/** Public Routes */
routes.use('/public/clients', clientsPublicRouter);
routes.use('/public/processes', processesPublicRouter);

export default routes;

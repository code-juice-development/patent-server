import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import processStagesRouter from '@modules/processStages/infra/http/routes/processStages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/process-stages', processStagesRouter);

export default routes;

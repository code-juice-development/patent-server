import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import processStagesRouter from '@modules/processStages/infra/http/routes/processStages.routes';
import processRouter from '@modules/process/infra/http/routes/processes.routes';
import processStatusStages from '@modules/processStatusStages/infra/http/routes/processStatusStages.routes';
import processUpdates from '@modules/processUpdates/infra/http/routes/processUpdates.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/process-stages', processStagesRouter);
routes.use('/processes', processRouter);
routes.use('/process-status-stages', processStatusStages);
routes.use('/process-updates', processUpdates);

export default routes;

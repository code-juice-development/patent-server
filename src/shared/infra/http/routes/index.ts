import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import processStagesRouter from '@modules/processStages/infra/http/routes/processStages.routes';
import processRouter from '@modules/process/infra/http/routes/processes.routes';
import processStatusStages from '@modules/processStatusStages/infra/http/routes/processStatusStages.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/clients', clientsRouter);
routes.use('/process-stages', processStagesRouter);
routes.use('/process', processRouter);
routes.use('/process-status-stages', processStatusStages);

export default routes;

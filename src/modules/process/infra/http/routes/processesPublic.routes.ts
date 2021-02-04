import { Router } from 'express';

import ProcessesTotalController from '@modules/process/infra/http/controllers/ProcessesTotalController';

const processesRouter = Router();

const processesTotalController = new ProcessesTotalController();

processesRouter.get('/total', processesTotalController.index);

export default processesRouter;

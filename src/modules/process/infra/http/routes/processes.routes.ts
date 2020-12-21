import { Router } from 'express';

import ProcessesController from '@modules/process/infra/http/controllers/ProcessesController';

import createProcessMiddleware from '@modules/process/infra/http/middlewares/createProcessMiddleware';
import updateProcessMiddleware from '@modules/process/infra/http/middlewares/updateProcessMiddleware';
import deleteProcessMiddleware from '@modules/process/infra/http/middlewares/deleteProcessMiddleware';
import showProcessMiddleware from '@modules/process/infra/http/middlewares/showProcessMiddleware';
import indexProcessesMiddleware from '@modules/process/infra/http/middlewares/indexProcessesMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processesRouter = Router();

const processesController = new ProcessesController();

processesRouter.use(isUserLoggedIn);

processesRouter.post('/', createProcessMiddleware, processesController.create);
processesRouter.put(
  '/:id',
  updateProcessMiddleware,
  processesController.update,
);
processesRouter.delete(
  '/:id',
  deleteProcessMiddleware,
  processesController.delete,
);
processesRouter.get('/:id', showProcessMiddleware, processesController.show);
processesRouter.get('/', indexProcessesMiddleware, processesController.index);

export default processesRouter;

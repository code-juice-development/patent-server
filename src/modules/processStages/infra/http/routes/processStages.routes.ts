import { Router } from 'express';

import ProcessStagesController from '@modules/processStages/infra/http/controllers/ProcessStagesController';

import createProcessStagesMiddleware from '@modules/processStages/infra/http/middlewares/createProcessStagesMiddleware';
import updateProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/updateProcessStageMiddleware';
import deleteProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/deleteProcessStageMiddleware';
import showProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/showProcessStageMiddleware';
import indexProcessStagesMiddleware from '@modules/processStages/infra/http/middlewares/indexProcessStagesMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processStagesRouter = Router();

const clientsController = new ProcessStagesController();

processStagesRouter.use(isUserLoggedIn);

processStagesRouter.post(
  '/',
  createProcessStagesMiddleware,
  clientsController.create,
);
processStagesRouter.put(
  '/:id',
  updateProcessStageMiddleware,
  clientsController.update,
);
processStagesRouter.delete(
  '/:id',
  deleteProcessStageMiddleware,
  clientsController.delete,
);
processStagesRouter.get(
  '/:id',
  showProcessStageMiddleware,
  clientsController.show,
);
processStagesRouter.get(
  '/',
  indexProcessStagesMiddleware,
  clientsController.index,
);

export default processStagesRouter;

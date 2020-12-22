import { Router } from 'express';

import ProcessStagesController from '@modules/processStages/infra/http/controllers/ProcessStagesController';

import createProcessStagesMiddleware from '@modules/processStages/infra/http/middlewares/createProcessStagesMiddleware';
import updateProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/updateProcessStageMiddleware';
import deleteProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/deleteProcessStageMiddleware';
import showProcessStageMiddleware from '@modules/processStages/infra/http/middlewares/showProcessStageMiddleware';
import indexProcessStagesMiddleware from '@modules/processStages/infra/http/middlewares/indexProcessStagesMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processStagesRouter = Router();

const processStagesController = new ProcessStagesController();

processStagesRouter.use(isUserLoggedIn);

processStagesRouter.post(
  '/',
  createProcessStagesMiddleware,
  processStagesController.create,
);
processStagesRouter.put(
  '/:id',
  updateProcessStageMiddleware,
  processStagesController.update,
);
processStagesRouter.delete(
  '/:id',
  deleteProcessStageMiddleware,
  processStagesController.delete,
);
processStagesRouter.get(
  '/:id',
  showProcessStageMiddleware,
  processStagesController.show,
);
processStagesRouter.get(
  '/',
  indexProcessStagesMiddleware,
  processStagesController.index,
);

export default processStagesRouter;

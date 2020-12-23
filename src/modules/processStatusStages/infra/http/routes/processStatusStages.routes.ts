import { Router } from 'express';

import ProcessStatusStagesController from '@modules/processStatusStages/infra/http/controllers/ProcessStatusStagesController';

import updateProcessStatusStageMiddleware from '@modules/processStatusStages/infra/http/middlewares/updateProcessStatusStageMiddleware';
import showProcessStatusStageMiddleware from '@modules/processStatusStages/infra/http/middlewares/showProcessStatusStageMiddleware';
import indexProcessStatusStagesMiddleware from '@modules/processStatusStages/infra/http/middlewares/indexProcessStatusStagesMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processStatusStagesRouter = Router();

const processStatusStagesController = new ProcessStatusStagesController();

processStatusStagesRouter.use(isUserLoggedIn);

processStatusStagesRouter.put(
  '/:id',
  updateProcessStatusStageMiddleware,
  processStatusStagesController.update,
);

processStatusStagesRouter.get(
  '/:id',
  showProcessStatusStageMiddleware,
  processStatusStagesController.show,
);
processStatusStagesRouter.get(
  '/',
  indexProcessStatusStagesMiddleware,
  processStatusStagesController.index,
);

export default processStatusStagesRouter;

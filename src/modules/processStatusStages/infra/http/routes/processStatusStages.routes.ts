import { Router } from 'express';

import ProcessStatusStagesController from '@modules/processStatusStages/infra/http/controllers/ProcessStatusStagesController';
import ProcessStatusStageResolvedTotalController from '@modules/processStatusStages/infra/http/controllers/ProcessStatusStageResolvedTotalController';
import ProcessStatusStagePendentTotalController from '@modules/processStatusStages/infra/http/controllers/ProcessStatusStagePendentTotalController';

import updateProcessStatusStageMiddleware from '@modules/processStatusStages/infra/http/middlewares/updateProcessStatusStageMiddleware';
import showProcessStatusStageMiddleware from '@modules/processStatusStages/infra/http/middlewares/showProcessStatusStageMiddleware';
import indexProcessStatusStagesMiddleware from '@modules/processStatusStages/infra/http/middlewares/indexProcessStatusStagesMiddleware';

import showProcessStatusStageTotalMiddleware from '@modules/processStatusStages/infra/http/middlewares/showProcessStatusStageTotalMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processStatusStagesRouter = Router();

const processStatusStagesController = new ProcessStatusStagesController();
const processStatusStageResolvedTotalController = new ProcessStatusStageResolvedTotalController();
const processStatusStagePendentTotalController = new ProcessStatusStagePendentTotalController();

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

processStatusStagesRouter.get(
  '/total/resolved/:process_stage_id',
  showProcessStatusStageTotalMiddleware,
  processStatusStageResolvedTotalController.show,
);

processStatusStagesRouter.get(
  '/total/pendent/:process_stage_id',
  showProcessStatusStageTotalMiddleware,
  processStatusStagePendentTotalController.show,
);

export default processStatusStagesRouter;

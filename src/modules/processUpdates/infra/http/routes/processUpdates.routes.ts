import { Router } from 'express';

import ProcessUpdatesController from '@modules/processUpdates/infra/http/controllers/ProcessUpdatesController';

import createProcessUpdateMiddleware from '@modules/processUpdates/infra/http/middlewares/createProcessUpdateMiddleware';
import deleteProcessUpdateMiddleware from '@modules/processUpdates/infra/http/middlewares/deleteProcessUpdateMiddleware';
import showProcessUpdateMiddleware from '@modules/processUpdates/infra/http/middlewares/showProcessUpdateMiddleware';
import indexProcessUpdatesMiddleware from '@modules/processUpdates/infra/http/middlewares/indexProcessUpdatesMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processUpdatesRouter = Router();

const processUpdatesController = new ProcessUpdatesController();

processUpdatesRouter.use(isUserLoggedIn);

processUpdatesRouter.post(
  '/',
  createProcessUpdateMiddleware,
  processUpdatesController.create,
);
processUpdatesRouter.delete(
  '/:id',
  deleteProcessUpdateMiddleware,
  processUpdatesController.delete,
);
processUpdatesRouter.get(
  '/:id',
  showProcessUpdateMiddleware,
  processUpdatesController.show,
);
processUpdatesRouter.get(
  '/',
  indexProcessUpdatesMiddleware,
  processUpdatesController.index,
);

export default processUpdatesRouter;

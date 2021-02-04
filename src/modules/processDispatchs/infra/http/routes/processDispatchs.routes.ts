import { Router } from 'express';

import ProcessDispatchsController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchsController';
import ProcessDispatchsPendingController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchsPendingController';
import ProcessDispatchsAnnotationController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchsAnnotationController';

import updateProcessPendingDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/updateProcessDispatchPendingMiddleware';
import updateProcessDispatchAnnotationMiddleware from '@modules/processDispatchs/infra/http/middlewares/updateProcessDispatchAnnotationMiddleware';

import showProcessDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/showProcessDispatchMiddleware';
import indexProcessDispatchsMiddleware from '@modules/processDispatchs/infra/http/middlewares/indexProcessDispatchsMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processDispatchsRouter = Router();

const processDispatchsController = new ProcessDispatchsController();
const processDispatchsPendingController = new ProcessDispatchsPendingController();
const processDispatchsAnnotationController = new ProcessDispatchsAnnotationController();

processDispatchsRouter.use(isUserLoggedIn);

processDispatchsRouter.put(
  '/pending/:id',
  updateProcessPendingDispatchMiddleware,
  processDispatchsPendingController.update,
);

processDispatchsRouter.put(
  '/annotation/:id',
  updateProcessDispatchAnnotationMiddleware,
  processDispatchsAnnotationController.update,
);

processDispatchsRouter.get(
  '/:id',
  showProcessDispatchMiddleware,
  processDispatchsController.show,
);

processDispatchsRouter.get(
  '/',
  indexProcessDispatchsMiddleware,
  processDispatchsController.index,
);

export default processDispatchsRouter;

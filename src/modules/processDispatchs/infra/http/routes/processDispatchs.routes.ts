import { Router } from 'express';

import ProcessDispatchsController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchsController';

import updateProcessDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/updateProcessDispatchMiddleware';
import showProcessDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/showProcessDispatchMiddleware';
import indexProcessDispatchsMiddleware from '@modules/processDispatchs/infra/http/middlewares/indexProcessDispatchsMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processDispatchsRouter = Router();

const processDispatchsController = new ProcessDispatchsController();

processDispatchsRouter.use(isUserLoggedIn);

processDispatchsRouter.put(
  '/:id',
  updateProcessDispatchMiddleware,
  processDispatchsController.update,
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

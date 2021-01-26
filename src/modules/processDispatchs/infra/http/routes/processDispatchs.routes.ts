import { Router } from 'express';

import ProcessDispatchsController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchsController';
import ProcessDispatchResolvedTotalController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchResolvedTotalController';
import ProcessDispatchPendentTotalController from '@modules/processDispatchs/infra/http/controllers/ProcessDispatchPendentTotalController';

import updateProcessDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/updateProcessDispatchMiddleware';
import showProcessDispatchMiddleware from '@modules/processDispatchs/infra/http/middlewares/showProcessDispatchMiddleware';
import indexProcessDispatchsMiddleware from '@modules/processDispatchs/infra/http/middlewares/indexProcessDispatchsMiddleware';

import showProcessDispatchTotalMiddleware from '@modules/processDispatchs/infra/http/middlewares/showProcessDispatchTotalMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processDispatchsRouter = Router();

const processDispatchsController = new ProcessDispatchsController();
const processDispatchResolvedTotalController = new ProcessDispatchResolvedTotalController();
const processDispatchPendentTotalController = new ProcessDispatchPendentTotalController();

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

processDispatchsRouter.get(
  '/total/resolved/:dispatch_id',
  showProcessDispatchTotalMiddleware,
  processDispatchResolvedTotalController.show,
);

processDispatchsRouter.get(
  '/total/pendent/:dispatch_id',
  showProcessDispatchTotalMiddleware,
  processDispatchPendentTotalController.show,
);

export default processDispatchsRouter;

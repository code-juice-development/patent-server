import { Router } from 'express';

import DispatchsController from '@modules/dispatchs/infra/http/controllers/DispatchsController';
import DispatchsTotalController from '@modules/dispatchs/infra/http/controllers/DispatchsTotalController';
import DispatchsTotalPendentController from '@modules/dispatchs/infra/http/controllers/DispatchsTotalPendentController';
import DispatchsTotalAfterSaleController from '@modules/dispatchs/infra/http/controllers/DispatchsTotalAfterSaleController';

import createDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/createDispatchMiddleware';
import updateDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/updateDispatchMiddleware';
import deleteDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/deleteDispatchMiddleware';
import showDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/showDispatchMiddleware';
import indexDispatchsMiddleware from '@modules/dispatchs/infra/http/middlewares/indexDispatchsMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const dispatchsRouter = Router();

const dispatchsController = new DispatchsController();
const dispatchsTotalController = new DispatchsTotalController();
const dispatchsTotalPendentController = new DispatchsTotalPendentController();
const dispatchsTotalAfterSaleController = new DispatchsTotalAfterSaleController();

dispatchsRouter.use(isUserLoggedIn);

dispatchsRouter.get('/total', dispatchsTotalController.index);
dispatchsRouter.get('/total-pendent', dispatchsTotalPendentController.index);
dispatchsRouter.get(
  '/total-after-sale',
  dispatchsTotalAfterSaleController.index,
);

dispatchsRouter.post('/', createDispatchMiddleware, dispatchsController.create);
dispatchsRouter.put(
  '/:id',
  updateDispatchMiddleware,
  dispatchsController.update,
);
dispatchsRouter.delete(
  '/:id',
  deleteDispatchMiddleware,
  dispatchsController.delete,
);
dispatchsRouter.get('/:id', showDispatchMiddleware, dispatchsController.show);
dispatchsRouter.get('/', indexDispatchsMiddleware, dispatchsController.index);

export default dispatchsRouter;

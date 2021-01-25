import { Router } from 'express';

import DispatchsController from '@modules/dispatchs/infra/http/controllers/DispatchsController';

import createDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/createDispatchMiddleware';
import updateDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/updateDispatchMiddleware';
import deleteDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/deleteDispatchMiddleware';
import showDispatchMiddleware from '@modules/dispatchs/infra/http/middlewares/showDispatchMiddleware';
import indexDispatchsMiddleware from '@modules/dispatchs/infra/http/middlewares/indexDispatchsMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const dispatchsRouter = Router();

const dispatchsController = new DispatchsController();

dispatchsRouter.use(isUserLoggedIn);

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

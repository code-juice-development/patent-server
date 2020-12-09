import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersPasswordController from '@modules/users/infra/http/controllers/UsersPasswordController';
import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

import createUserMiddleware from '@modules/users/infra/http/middlewares/createUserMiddleware';
import updateUserMiddleware from '@modules/users/infra/http/middlewares/updateUserMiddleware';
import deleteUserMiddleware from '@modules/users/infra/http/middlewares/deleteUserMiddleware';
import showUserMiddleware from '@modules/users/infra/http/middlewares/showUserMiddleware';
import indexUserMiddleware from '@modules/users/infra/http/middlewares/indexUserMiddleware';

import updateUserPasswordMiddleware from '@modules/users/infra/http/middlewares/updateUserPasswordMiddleware';
import createSessionMiddleware from '@modules/users/infra/http/middlewares/createSessionMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const usersRouter = Router();

const usersController = new UsersController();
const usersPasswordController = new UsersPasswordController();
const sessionsController = new SessionsController();

usersRouter.post(
  '/sessions',
  createSessionMiddleware,
  sessionsController.create,
);

usersRouter.use(isUserLoggedIn);

usersRouter.post('/', createUserMiddleware, usersController.create);
usersRouter.put('/:id', updateUserMiddleware, usersController.update);
usersRouter.delete('/:id', deleteUserMiddleware, usersController.delete);
usersRouter.get('/:id', showUserMiddleware, usersController.show);
usersRouter.get('/', indexUserMiddleware, usersController.index);

usersRouter.put(
  '/:id/password',
  updateUserPasswordMiddleware,
  usersPasswordController.update,
);

export default usersRouter;

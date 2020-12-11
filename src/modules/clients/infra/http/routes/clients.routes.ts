import { Router } from 'express';

import ClientsController from '@modules/clients/infra/http/controller/ClientsController';

import createClientMiddleware from '@modules/clients/infra/http/middlewares/createClientMiddleware';
import updateClientMiddleware from '@modules/clients/infra/http/middlewares/updateClientMiddleware';
import deleteClientMiddleware from '@modules/clients/infra/http/middlewares/deleteClientMiddleware';
import showClientMiddleware from '@modules/clients/infra/http/middlewares/showClientMiddleware';
import indexClientsMiddleware from '@modules/clients/infra/http/middlewares/indexClientsMiddleware';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.use(isUserLoggedIn);

clientsRouter.post('/', createClientMiddleware, clientsController.create);
clientsRouter.put('/:id', updateClientMiddleware, clientsController.update);
clientsRouter.delete('/:id', deleteClientMiddleware, clientsController.delete);
clientsRouter.get('/:id', showClientMiddleware, clientsController.show);
clientsRouter.get('/', indexClientsMiddleware, clientsController.index);

export default clientsRouter;

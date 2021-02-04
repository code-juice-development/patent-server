import { Router } from 'express';

import ClientsTotalController from '@modules/clients/infra/http/controller/ClientsTotalController';

const clientsRouter = Router();

const clientsTotalController = new ClientsTotalController();

clientsRouter.get('/total', clientsTotalController.index);

export default clientsRouter;

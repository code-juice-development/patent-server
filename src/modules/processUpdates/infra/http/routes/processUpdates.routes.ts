import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ProcessUpdatesController from '@modules/processUpdates/infra/http/controllers/ProcessUpdatesController';

import isUserLoggedIn from '@modules/users/infra/http/middlewares/isUserLoggedIn';

const processUpdatesRouter = Router();
const upload = multer(uploadConfig);

const processStatusStagesController = new ProcessUpdatesController();

processUpdatesRouter.use(isUserLoggedIn);

processUpdatesRouter.post(
  '/',
  upload.single('file'),
  processStatusStagesController.create,
);

export default processUpdatesRouter;

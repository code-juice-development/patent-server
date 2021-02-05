import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from '@shared/infra/http/routes/';
import errorHandler from '@shared/infra/http/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CROSS_ORIGIN }));
app.use(routes);
app.use(errors());
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(process.env.PORT || 3333, () => console.log('🚀 Server launched'));

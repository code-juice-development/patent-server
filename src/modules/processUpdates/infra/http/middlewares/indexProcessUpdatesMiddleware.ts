import { celebrate, Joi, Segments } from 'celebrate';

const indexProcessUpdatesMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    page: Joi.number(),
    rows: Joi.number(),
    ordernation: Joi.string(),
    number: Joi.number(),
    date: Joi.string(),
    upload: Joi.string(),
    description: Joi.string(),
  }),
});

export default indexProcessUpdatesMiddleware;

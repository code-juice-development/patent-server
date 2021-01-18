import { celebrate, Joi, Segments } from 'celebrate';

const indexProcessesMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    page: Joi.number(),
    rows: Joi.number(),
    ordernation: Joi.string(),
    number: Joi.string(),
    brand: Joi.string(),
    kind: Joi.string(),
    presentation: Joi.string(),
    last_update: Joi.string().isoDate(),
    birthday: Joi.string().isoDate(),
    client_id: Joi.string().uuid(),
    pendent: Joi.boolean(),
  }),
});

export default indexProcessesMiddleware;

import { celebrate, Joi, Segments } from 'celebrate';

const createProcessMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    number: Joi.string().required(),
    brand: Joi.string().required(),
    kind: Joi.string().required(),
    presentation: Joi.string().required(),
    last_update: Joi.string().isoDate().required(),
    birthday: Joi.string().isoDate().required(),
    client_id: Joi.string().uuid().required(),
    process_stage_id: Joi.string().uuid(),
  }),
});

export default createProcessMiddleware;

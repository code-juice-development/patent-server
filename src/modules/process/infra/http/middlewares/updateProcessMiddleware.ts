import { celebrate, Joi, Segments } from 'celebrate';

const updateProcessMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    number: Joi.string().required(),
    brand: Joi.string().required(),
    kind: Joi.string().required(),
    presentation: Joi.string().required(),
    last_update: Joi.string().isoDate().required(),
    birthday: Joi.string().isoDate().required(),
    filed: Joi.boolean().default(false),
    client_id: Joi.string().uuid().required(),
  }),
});

export default updateProcessMiddleware;

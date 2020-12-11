import { celebrate, Joi, Segments } from 'celebrate';

const deleteClientMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deleteClientMiddleware;

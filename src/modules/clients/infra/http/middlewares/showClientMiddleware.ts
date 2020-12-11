import { celebrate, Joi, Segments } from 'celebrate';

const showClientMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showClientMiddleware;

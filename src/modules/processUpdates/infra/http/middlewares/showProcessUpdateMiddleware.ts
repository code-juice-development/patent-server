import { celebrate, Joi, Segments } from 'celebrate';

const showProcessUpdateMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProcessUpdateMiddleware;

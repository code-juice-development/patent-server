import { celebrate, Joi, Segments } from 'celebrate';

const showUserMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showUserMiddleware;

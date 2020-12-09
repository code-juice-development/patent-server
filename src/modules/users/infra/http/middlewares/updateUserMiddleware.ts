import { celebrate, Joi, Segments } from 'celebrate';

const updateUserMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
});

export default updateUserMiddleware;

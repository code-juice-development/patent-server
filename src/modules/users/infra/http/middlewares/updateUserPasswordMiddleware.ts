import { celebrate, Joi, Segments } from 'celebrate';

const updateUserPasswordMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
});

export default updateUserPasswordMiddleware;

import { celebrate, Joi, Segments } from 'celebrate';

const createUserMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default createUserMiddleware;

import { celebrate, Joi, Segments } from 'celebrate';

const createSessionMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export default createSessionMiddleware;

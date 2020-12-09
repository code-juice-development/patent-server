import { celebrate, Joi, Segments } from 'celebrate';

const deleteUserMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deleteUserMiddleware;

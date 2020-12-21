import { celebrate, Joi, Segments } from 'celebrate';

const showProcessMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProcessMiddleware;

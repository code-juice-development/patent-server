import { celebrate, Joi, Segments } from 'celebrate';

const showDispatchMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showDispatchMiddleware;

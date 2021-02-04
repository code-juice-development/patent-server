import { celebrate, Joi, Segments } from 'celebrate';

const updateProcessDispatchPendingMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    annotation: Joi.string().required(),
  }),
});

export default updateProcessDispatchPendingMiddleware;

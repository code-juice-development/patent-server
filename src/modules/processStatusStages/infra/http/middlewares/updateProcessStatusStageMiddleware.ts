import { celebrate, Joi, Segments } from 'celebrate';

const indexProcessStatusStagesMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    resolved_pending: Joi.boolean(),
  }),
});

export default indexProcessStatusStagesMiddleware;

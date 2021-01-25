import { celebrate, Joi, Segments } from 'celebrate';

const indexProcessStatusStagesMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    page: Joi.number(),
    rows: Joi.number(),
    ordernation: Joi.string(),
    has_pending: Joi.boolean(),
    resolved_pending: Joi.boolean(),
    process_id: Joi.string().uuid(),
    dispatch_id: Joi.string().uuid(),
  }),
});

export default indexProcessStatusStagesMiddleware;

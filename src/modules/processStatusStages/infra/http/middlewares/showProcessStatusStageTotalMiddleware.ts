import { celebrate, Joi, Segments } from 'celebrate';

const showProcessStatusStageTotalMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    process_stage_id: Joi.string().uuid().required(),
  }),
});

export default showProcessStatusStageTotalMiddleware;

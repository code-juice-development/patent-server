import { celebrate, Joi, Segments } from 'celebrate';

const showProcessStatusStageTotalMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    dispatch_id: Joi.string().uuid().required(),
  }),
});

export default showProcessStatusStageTotalMiddleware;

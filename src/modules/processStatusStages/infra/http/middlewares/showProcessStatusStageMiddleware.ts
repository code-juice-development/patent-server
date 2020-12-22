import { celebrate, Joi, Segments } from 'celebrate';

const showProcessStatusStageMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProcessStatusStageMiddleware;

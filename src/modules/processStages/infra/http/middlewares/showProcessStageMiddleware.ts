import { celebrate, Joi, Segments } from 'celebrate';

const showProcessStageMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default showProcessStageMiddleware;

import { celebrate, Joi, Segments } from 'celebrate';

const deleteProcessStageMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
});

export default deleteProcessStageMiddleware;

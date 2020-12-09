import { celebrate, Joi, Segments } from 'celebrate';

const indexUsersMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({}),
});

export default indexUsersMiddleware;

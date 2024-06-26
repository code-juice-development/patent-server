import { celebrate, Joi, Segments } from 'celebrate';

const updateDispatchMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.number(),
    send_message: Joi.boolean(),
    model_message: Joi.string().allow(null, '').optional(),
    send_email: Joi.boolean(),
    model_email: Joi.string().allow(null, '').optional(),
    after_sale: Joi.number(),
  }),
});

export default updateDispatchMiddleware;

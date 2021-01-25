import { celebrate, Joi, Segments } from 'celebrate';

const createDispatchMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.number(),
    send_message: Joi.boolean().optional(),
    model_message: Joi.string().allow(null, '').optional(),
    send_email: Joi.boolean().optional(),
    model_email: Joi.string().allow(null, '').optional(),
  }),
});

export default createDispatchMiddleware;

import { celebrate, Joi, Segments } from 'celebrate';

const indexDispatchMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    page: Joi.number(),
    rows: Joi.number(),
    ordernation: Joi.string(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    deadline: Joi.number(),
    send_message: Joi.boolean(),
    send_email: Joi.boolean(),
    after_sale: Joi.number(),
  }),
});

export default indexDispatchMiddleware;

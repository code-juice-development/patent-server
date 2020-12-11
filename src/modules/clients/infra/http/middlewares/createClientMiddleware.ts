import { celebrate, Joi, Segments } from 'celebrate';

const createClientMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).required(),
    cpf: Joi.string().length(11),
    cnpj: Joi.string().length(14),
  }),
});

export default createClientMiddleware;

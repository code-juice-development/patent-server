import { celebrate, Joi, Segments } from 'celebrate';

const updateClientMiddleware = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).required(),
    cpf: Joi.string().length(11).allow(''),
    cnpj: Joi.string().length(14).allow(''),
  }),
});

export default updateClientMiddleware;

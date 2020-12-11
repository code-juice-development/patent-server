import { celebrate, Joi, Segments } from 'celebrate';

const indexClientsMiddleware = celebrate({
  [Segments.BODY]: Joi.object().keys({
    page: Joi.number(),
    rows: Joi.number(),
    ordernation: Joi.string(),
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().length(11),
    cpf: Joi.string().length(11),
    cnpj: Joi.string().length(14),
  }),
});

export default indexClientsMiddleware;

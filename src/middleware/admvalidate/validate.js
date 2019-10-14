const Joi = require('@hapi/joi');

const admValidate = Joi.object({
    tipo: Joi.string().min(3).max(50),
    nome: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    sexo: Joi.string().min(3).max(50),
    faixa_idade: Joi.string().min(3).max(50),
    grauInstrucao: Joi.string().min(3).max(50),

});

module.exports = {
    admValidate
}
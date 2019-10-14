const Joi = require('@hapi/joi');


const userValidate = Joi.object({
    nome: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    sexo: Joi.string().min(3).max(50),
    faixa_idade: Joi.string().min(3).max(50),
    grauInstrucao: Joi.string().min(3).max(50),
    endereco: [{
        estado: Joi.string(),
        cidade: Joi.string(),
        rua: Joi.string(),
        bairro: Joi.string(),
        numero: Joi.string(),
        complemento: Joi.string()
    }]

});



const loginValidate = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
})


module.exports = {
    userValidate,
    loginValidate,
}
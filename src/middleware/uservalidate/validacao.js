const validacao = require('./validate');

const validacaoUser = async (req, res, next) => {
    const { tipo, nome, email, password, sexo, faixa_idade, grauInstrucao, endereco } = req.body;
    // const { error } = await userjoi.userValidate.validateAsync({nome, email, password, sexo, faixa_idade, graudeinstrucao});
    try {
        const { error } = await validacao.userValidate.validate({
            tipo,
            nome,
            email,
            password,
            sexo,
            faixa_idade,
            grauInstrucao,
            endereco
        });
        if (error) {
            return next();
        }
        return res.status(400).json({ err: 'Try Erro na validação dos dados enviados!' }).send();

    } catch (err) {

        return res.status(400).json({ err: 'Cath Erro na validação dos dados enviados!' }).send();
    }


}

const validateDelete = async (req, res, next) => {
    const { id } = req.params.id;
    try {
        if (!id) {
            return next();
        }
        return res.status(204).json({ err: "Não Consta a id do usuário!" });
    } catch (err) {
        return res.status(400).json({ err: "Erro no envio da Indentificação do Usário! Catch" });
    }
}

const validateLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(206).json({ err: 'Dados Insuficientes!' });
        }
        const { error } = await validacao.loginValidate.validateAsync({
            email,
            password
        });
        if (!error) {
            return next();
        }
        return res.status(400).json({ err: "Dados enviados não são válidos!" });
    } catch (err) {
        return res.status(400).json({ err: "Erro!" });
    }
}



module.exports = {
    validacaoUser,
    validateDelete,
    validateLogin
};
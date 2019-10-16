const Solicitacao = require('../models/Solicitacao');
const UserFim = require('../models/UserFim');
const jwt = require('jsonwebtoken');


const list = async (req, res) => {
    try {
        const userId = jwt.decode(req.headers.auth);
        const solicitacao = await Solicitacao.find({ userId.id._id }).exec();
        console.log(solicitacao);
        if (solicitacao) {
            return res.status(404).json("Não consta solicitações para o usuário informado!")
        }
        return res.status(200).json(solicitacao);
    } catch (err) {
        return res.status(400).json({ err: "Erro Ao listar solicitação para esse usuário!" })
    }
}

const store = async (req, res) => {
    const { mensagem } = req.body;
    if (!mensagem) {
        return res.status(206).json('Dados Insuficientes!');
    }
    try {
        const solicitacao = await Solicitacao.create(req.body);
        return res.json(solicitacao);
    } catch (err) {
        return res.status(400).json({ err: "Solicitação não cadastrada!" })
    }
}

module.exports = {
    store,
    list
}
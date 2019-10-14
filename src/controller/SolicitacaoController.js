const Solicitacao = require('../models/Solicitacao');

const store = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) {
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
    store
}
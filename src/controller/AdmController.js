const Adm = require('../models/Adm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '5d' });
}

const index = async (req, res) => {
    try {
        const adm = await Adm.find({});
        if (adm) {
            return res.status(200).json(adm);
        }
        return res.status(404).json('Usuário não encontrado!');
    } catch (err) {
        return res.status(400).json({ err: 'Erro na listagem de admintrador' });
    }
}

const store = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(206).json({ err: "Dados Insuficientes" });
    }
    try {
        const buscaAdm = await Adm.findOne({ email });
        if (buscaAdm) {
            return res.status(200).json({ message: "Administrador já está cadastrado em nossa base de dados!" });
        }
        const adm = await Adm.create(req.body);
        return res.status(200).json(adm);
    } catch (err) {
        return res.status(400).json({ err: "Ouve um erro na criação do administrador" });
    }

}


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(206).json({ err: "Dados insuficientes!" })
    }
    try {
        const adm = await Adm.findOne({ email }).select(['password', 'nome', 'email', 'tipo']);
        if (!adm) {
            return res.status(404).json({ err: "Adminstrador não encontrado ou não consta em nossa base de dados" });
        }
        const pass_ok = await bcrypt.compare(password, adm.password);
        if (!pass_ok) {
            return res.status(401).json({ err: "Administrador ou senha inválidos" });
        }
        adm.password = undefined;
        return res.status(200).json({ adm, token: createAdmToken(adm.id) })
    } catch (err) {
        return res.status(401).json({ error: 'Não autorizado' });
    }

}

module.exports = {
    store,
    login,
    index
}


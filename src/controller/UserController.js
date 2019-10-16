const UserFim = require('../models/UserFim');
const Endereco = require('../models/Endereco');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '5d' });
}

const index = async (req, res) => {

    try {
        const user = await UserFim.find({}).exec();
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json('Usuários não encontrados');
        }
    } catch (err) {
        return res.status(400).json({ err: 'Erro na listagem de usuários!' })
    }
};

const store = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(206).json('Dados Insufucientes! ');
    }
    try {
        const buscaUser = await UserFim.findOne({ email });
        if (buscaUser) {
            return res.status(200).json('Usuário já cadastrado em nosso sistema!');
        }
        const user = await UserFim.create(req.body);
        user.password = undefined;
        return res.status(200).json(user);

    } catch (err) {
        return res.status(400).json({ err: 'Erro, usuário não cadastrado' });
    }

};

const destroy = async (req, res) => {
    try {
        const user = await UserFim.useFindAndModify(req.params.id);
        if (user) {
            return res.status(200).json({ err: "Usuário deletado com sucesso!" });
        }
    } catch (err) {
        return res.status(400).json({ err: "Não consta identificação para esses usuário!" });
    }

}

const update = async (req, res) => {
    try {
        const user = await UserFim.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(user);


    } catch (err) {
        return res.status(400).json({ err: 'Não foi possível fazer Upload nesse usuário!' });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(206).json({ err: 'Dados Insuficientes!' });
    }
    try {

        const user = await UserFim.findOne({ email }).select(['password', 'nome', 'email', 'sexo']);
        if (!user) {
            return res.status(404).json({ err: "Usuário não encontrado ou não consta em nossa base de dados" });
        }
        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.status(401).json({ err: 'Usuário e/ou senha inválidos' });
        user.password = undefined;
        return res.status(200).json({ user, token: createUserToken(user) });

    } catch (err) {
        return res.status(401).json({ error: 'Não autorizado' });
    }
}

module.exports = {
    store,
    index,
    login,
    destroy,
    update
}
const jwt = require('jsonwebtoken');


//Funçao de autenticação
const auth = (req, res, next) => {
    try {
        const token_header = req.headers.auth;
        if (!token_header) return res.status(401).json({ error: 'Token não enviado' });
        jwt.verify(token_header, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ err: 'Você não tem permissão de acesso ao sitema!' });
        });
        next();

    } catch (err) {
        return res.status(4001).json({
            err: "Falha na autenticação"
        })
    }
}


module.exports = auth;
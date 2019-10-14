const jwt = require('jsonwebtoken');

const authAdm = async (req, res, next) => {
    try {
        const token_header = req.headers.authadm;
        if (!token_header) {
            return res.status(401).json({ error: 'Token não enviado!' });
        }
        await jwt.verify(token_header, process.env.SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ err: "Permitido apenas Para Administradores" })
            next();
        });
    } catch (err) {
        return res.status(401).json({
            err: "Falha na autenticação"
        });
    }
}

module.exports = authAdm;
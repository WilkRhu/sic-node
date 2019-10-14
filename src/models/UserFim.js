const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const EnderecoSchema = require('../models/Endereco');



const UserFimSchema = new mongoose.Schema({
    tipo: { type: String },
    nome: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    sexo: { type: String },
    faixa_idade: { type: String },
    grauInstrucao: { type: String },
    endereco: [{
        _id: false,
        estado: String,
        rua: String,
        bairro: String,
        cidade: String,
        numero: String,
        complemento: String,
    }],

});

UserFimSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        if (err) {
            return err.status(400).json({ error: "Erro na encriptação do usuário" });
        }
        return next();
    });
});



module.exports = mongoose.model('UserFim', UserFimSchema);





const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EnderecoSchema = require('../models/Endereco');

const AdmSchema = new mongoose.Schema({
    tipo: { type: String, unique: true, select: false },
    nome: { type: String },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    sexo: { type: String },
    faixa_idade: { type: String },
    grauInstrucao: { type: String },
    endereco: [EnderecoSchema],
});

AdmSchema.pre('save', function (next) {
    let adm = this;
    if (!adm.isModified('password')) {
        return next();
    }
    bcrypt.hash(adm.password, 10, (err, encrypted) => {
        adm.password = encrypted;
        if (err) {

            return err.status(400).json({ error: "Erro na encriptação do administrador" });
        }
        return next();
    });
});

module.exports = mongoose.model('Adm', AdmSchema);
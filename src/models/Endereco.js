const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema({
    estado: String,
    rua: String,
    bairro: String,
    cidade: String,
    numero: String,
    complemento: String,
}, { _id: false });



module.exports = EnderecoSchema;
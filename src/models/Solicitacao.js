const mongoose = require('mongoose');

const SolicitacaoSchema = new mongoose.Schema({
    prioridade: { type: String, require: true },
    tipo: { type: String, require: true },
    mensagem: { type: String, require: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userfim',
        require: true
    },
    create_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Solicitacao', SolicitacaoSchema);


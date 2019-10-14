const mongoose = require('mongoose');

const url = process.env.DB_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('err', (err) => {
    console.log('Erro na conexão como o banco de dados: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
});
mongoose.connection.on('connected', () => {
    console.log('Aplicação Conectada ao banco de dados');
})
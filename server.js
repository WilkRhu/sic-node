require('dotenv').config();
const express = require('express');
require('./src/hellpers/conect');
const app = express();
const routes = require('./src/routes');

//Recebe em formato Json
app.use(express.json());

//Rotas
app.use(routes);


//Servidor
app.listen(process.env.PORT, process.env.HOST);

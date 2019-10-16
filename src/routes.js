const express = require('express');
const routes = express.Router();
const UserFimController = require('./controller/UserController');
const AdmController = require('./controller/AdmController');
const validacaoUser = require('./middleware/uservalidate/validacao');
const validacaoAdm = require('./middleware/admvalidate/validacaoAdm');
const auth = require('./middleware/auth');
const authAdm = require('./middleware/authAdm/authAdm');
const SolicitacaoController = require('./controller/SolicitacaoController');

//Rotas Administrador
routes.post('/adm', validacaoAdm.valCreateAdm, AdmController.store);
routes.post('/adm/login', AdmController.login);
routes.get('/adm', authAdm, AdmController.index);



/*************************************************************** */


//Rotas Usuários
routes.post('/userfim', validacaoUser.validacaoUser, UserFimController.store);
routes.get('/userfim', auth, UserFimController.index);
routes.delete('/userfim/:id', validacaoUser.validateDelete, UserFimController.destroy);
routes.post('/login', validacaoUser.validateLogin, UserFimController.login);
routes.put('/userfim/:id', auth, UserFimController.update);
//Rotas Solicitação dos usuários

routes.post('/solicitar', auth, SolicitacaoController.store);
routes.get('/solicitar', auth, SolicitacaoController.list);


module.exports = routes;
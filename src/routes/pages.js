const express = require('express');
const { Router } = require('express');

const statics = Router();
const passport = require('passport');
const authRH = require('../middlewares/authRH');

const authVerify = require('../middlewares/authVerify');

statics.use('/static', express.static('src/public'))
statics.use('/sidebar', express.static('src/views/includes'))

statics.use('/', express.static('src/views/login'))

statics.use('/listagem-funcionario', authVerify, authRH.authRH, express.static('src/views/listagem-funcionario'))
statics.use('/cadastro-funcionario', authVerify, express.static('src/views/cadastro-funcionario'))
statics.use('/visualizarFuncionario/:id', authVerify, express.static('src/views/visualizar-funcionario'))
statics.use('/editarFuncionario/:id', authVerify, express.static('src/views/edicao-funcionario'))

statics.use('/registro', authVerify, express.static('src/views/ponto'))
statics.use('/visualizarRegistro/:id', authVerify, express.static('src/views/visualizar-ponto'))
statics.use('/editarRegistro/:id', authVerify, express.static('src/views/edicao-ponto'))
statics.use('/historico',authVerify, express.static('src/views/historico'))

module.exports = statics;
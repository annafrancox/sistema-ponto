const Sequelize = require('sequelize')
const sequelize = require('../../src/_database')


const Usuario = sequelize.define('usuario', {
  nome: {
    type: Sequelize.STRING
  },
  matricula: {
    type: Sequelize.STRING
  },
  senha: {
    type: Sequelize.STRING
  },
  cargo: {
    type: Sequelize.STRING
  },
  ativo: {
    type: Sequelize.BOOLEAN
  },
})
module.exports = Usuario

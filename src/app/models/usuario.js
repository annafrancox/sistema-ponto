const Sequelize = require('sequelize')
const sequelize = require('../../database/database')


const Usuario = sequelize.define('usuario', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  matricula: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cargo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ativo: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
})

module.exports = Usuario
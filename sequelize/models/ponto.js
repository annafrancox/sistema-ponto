const Sequelize = require('sequelize')
const sequelize = require('../../src/_database')


const Ponto = sequelize.define('ponto', {
  matricula: {
    type: Sequelize.STRING
  },
  tipo: {
    type: Sequelize.STRING
  },
  data: {
    type: Sequelize.DATE
  },
  hora: {
    type: Sequelize.TIME
  },
  observacao: {
    type: Sequelize.STRING
  },
})
module.exports = Ponto
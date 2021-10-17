const Sequelize = require('sequelize')
const sequelize = require('../../database/database')


const Ponto = sequelize.define('ponto', {
  matricula: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  hora: {
    type: Sequelize.TIME,
    allowNull: false
  },
  observacao: {
    type: Sequelize.STRING
  },
})
module.exports = Ponto
const sequelize = require('../../src/_database')

const models = {
  usuario: require('./usuario'),
  ponto: require('./ponto'),
  sequelize: sequelize
}

module.exports = models

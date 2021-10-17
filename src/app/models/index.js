const sequelize = require('../../database/database')

const models = {
  usuario: require('./usuario'),
  ponto: require('./ponto'),
  sequelize: sequelize
}

module.exports = models
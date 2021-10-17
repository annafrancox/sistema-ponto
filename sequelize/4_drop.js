const models = require('./models')

async function drop(){
  await models.sequelize.drop()

  console.log("Tabela deletada");
}
drop()

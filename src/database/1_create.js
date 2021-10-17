const models = require('../app/models/index');

async function create(){
  await models.sequelize.sync({force: true})
  await models.sequelize.close()

  console.log("Banco sincronizado");
}
create()

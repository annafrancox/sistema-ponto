const models = require('./models')
function insert(){

  //usuario
  // const usuario1 =await models.usuario.create({nome: 'Anna Leticia', matricula: '980091', cargo: 'funcionario'})
  // const usuario2 =await models.usuario.create({nome: 'Anna Leticia', matricula: '980091', cargo: 'funcionario'})

  //ponto
  const ponto1  =models.ponto.create({matricula: '980091', hora: '08:00:02', tipo: 'entrada'})
  const ponto2  = models.ponto.create({matricula: '980091', hora: '12:00:12', tipo: 'saida'})

  models.sequelize.close()

  console.log("Dados Inseridos");
}
insert()

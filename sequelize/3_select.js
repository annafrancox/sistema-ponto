const models = require('./models')

async function select(){
  console.log("\n");
  
  //Eventos
  const usuarios = await models.usuario.findAll()
  usuarios.forEach((usuario) => {
      console.log("Funcionarios: ", usuario.nome)
  })
  console.log("\n");

  //Participantes
  const pontos  = await models.ponto.findAll()
  pontos.forEach((ponto) => {
    console.log("Ponto: ", ponto)
  })
  console.log("\n");

  await models.sequelize.close()
}
select()

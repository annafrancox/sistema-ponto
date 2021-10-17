const Sequelize = require('sequelize');
const server = require('../config/index'); // Importando a variável com os elementos do dotenv

const sequelize = new Sequelize({
  host: server.host,
  database: server.database,
  username: server.username,
  password: server.password,
  dialect: server.dialect,
  port: server.port,
  schema: server.schema,
  logging: true,
  timezone: '-2:00'
});

module.exports = sequelize

// Test DB Conenction //
async function test(){
  try{
      let result = await sequelize.authenticate()
      console.log("Sequelize realizou a conexão com o banco de dados com sucesso!")
  }
  catch(error){
      console.error("Houve um erro ao conectar com o banco de dados:")
      console.error(error)
      process.exit()
  }
}

test()
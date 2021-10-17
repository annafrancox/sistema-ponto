const dotenv = require('dotenv') // Importando a biblioteca dotenv, que permite a leitura do dotenv

dotenv.config(`./env`) // Configurando o caminho do .env, aqui eu coloquei a raiz

const server = { 
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    schema: process.env.DB_SCHEMA,

} // Eu criei essa variável pra salvar todos os elementos do server

module.exports = server; // Exportando a variavel 

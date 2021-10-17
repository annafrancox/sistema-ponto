const jwt = require('jsonwebtoken');
const User = require('../app/models/usuario');

const decodingJWT = (token) => {

    if(token !== null || token !== undefined){
     const base64String = token.split('.')[1];
     const decodedValue = JSON.parse(Buffer.from(base64String,    
                          'base64').toString('ascii'));
     return decodedValue;
    }
    return null;
}

async function getUser (id) {
    
    let user = await User.findByPk(id);
    return user;//.cargo === 'gerenterh';
}

module.exports = {
    async authRH (request, response, next) {

        const authHeader = request.headers.cookie;
        let id = decodingJWT(authHeader).id
        let usuario = await getUser(id);
        if(usuario.cargo === 'gerenterh'){
            next();
        }else{
            return response.redirect("/inicio");
        }
    },
    async usuarioExp (request, response) {
        const authHeader = request.headers.cookie;
        let id = decodingJWT(authHeader).id
        var usuario = await getUser(id);
        console.log(usuario)
        responde.send(usuario); 
    }
}
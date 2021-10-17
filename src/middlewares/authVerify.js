const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {

    const authHeader = request.headers.cookie;


    if(authHeader)
        next();
    else
        response.redirect('/');
}
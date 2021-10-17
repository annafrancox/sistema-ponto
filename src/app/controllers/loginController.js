const Usuario = require('../models/usuario');
const jwt = require("jsonwebtoken")
const passport = require('passport');

const secretKey = '123';

module.exports = {

    async auth(req,res, next){

        passport.authenticate('local', 
            { session: false },
            (err, user, info) => {
                if(err)
                    return res.status(500).json({ err })
                
                if(!user){
                    const { message } = info
                    return res.status(401).json({ message })
                }

                const { id } = user
                const token = jwt.sign({ id }, secretKey, { expiresIn: '1h' })

                res.cookie('jwt', token, { 
                    httpOnly: false, 
                    secure: false
                })
                .status(200)
                .redirect('/historico');

            }
        )(req, res, next)

    },
    async logout(request, response){
            request.logout();
            response.redirect('/');
    }

}

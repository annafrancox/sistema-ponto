const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Usuario = require('../app/models/usuario');

const secretKey = '123';

passport.use(new LocalStrategy({
    usernameField: 'matricula',
    passwordField: 'senha'
    },
    async function (matricula, senha, done){
        await Usuario.findOne({
            where:{ matricula: matricula }
        }).then((user) => {
            if(!user){
                return done(null, false, {message: 'Usuário não existe'})
            }

            const isValid = bcrypt.compareSync(senha, user.senha);

            if (!isValid) return done(null, false, { message: 'Senha incorreta!' })
            
            return done(null,user);

        }).catch((err) => {
            if(err) return done(err);
        })
    } 
))

passport.serializeUser((user, done) => { 
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => { 
    await Usuario.findByPk({ id: ObjectId(id) }).then((err, user) => { 
        done(err, user)
    })
})

// Estratégia JWT: Após autenticado, o usuário deverá 
// enviar o token no Header da requisição.
const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}

// Aqui, o middleware irá extrair o token do Header
// e verificar se ele é válido. Se o token estiver expirado,
// ou adulterado, o middleware retorna false ("Não autorizado")
passport.use(new JwtStrategy(opts, async (payload, done) => { 
    await Usuario.findOne({ matricula: payload.matricula }).then( user => {         

        if (!user) { 
            return done(null, false)
        }

        return done(null, { id: user.id })
    }).catch(err => {
        if(err) return done(err);
    });
}))


module.exports = passport;
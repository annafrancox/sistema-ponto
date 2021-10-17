// const express = require('express')

// const app = express()
const passport = require('passport')
const session = require('express-session')
require('./auth')(passport)
const port = 3000

app.use(session({
    secret: '123',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge:2 * 60 * 1000 } 
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', (request, response, next) => {
    if (request.query.fail) {
        console.log("Usuario e/ou senha incorretos")        
    }
    else{
        console.log("ENTRO")
    }
})
app.post('/', passport.authenticate('local', {
    successRedirect: '/inicio?fail=false',
    failureRedirect:'/?fail=true'
}))

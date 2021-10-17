const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const users = [{
    _id:1,
    username: "adm",
    registration: "980091",
    password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW"
}];

module.exports = function(passport){
    
    function findUser(username) {
        return users.find(user => user.username == username)        
    }
    function findUserByRegistration(registration) {
        return users.find(user => user.registration == registration)        
    }

    passport.serializeUser((user,done) => {
        done(null, user.registration);
    })
    passport.deserializeUser((registration, done) => {
        try{
            const user = findUserByRegistration(registration);
            done(null, user);
        }
        catch(err){
            console.log(err);
            return done(err, null);
        }
    })

    passport.use(new LocalStrategy({
        registrationField: 'registration',
        passwordField: 'password'
    },
     (registration, password, done) => {
        try{
            const user = findUserByRegistration(registration);
            
            if (!user)
            {
                return done(null, false);    
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if (!isValid) {
                return done(null, false);
            }
            return done(null, user);

        }
        catch(err){
            console.log(err);
            return done(err. false);
        }
    }));
}
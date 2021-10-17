const express = require('express')
const routes = require('./routes/routes');
const passport = require('./middlewares/auth');
const session = require('express-session');
const app = express();

app.use(passport.initialize());

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

let port = 3000 

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
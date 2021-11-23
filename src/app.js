const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('../config/passport-setup')
const mongoose = require('mongoose')
const keys = require('../config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express();

// set view engine
app.set('view engine', 'ejs');

// usando Cookies
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hasser:eo8ENRtR8lnASuv8@cluster0.9awkq.mongodb.net/classroom',
    { useNewUrlParser: true })
    .then(db => console.log('db is connected'))
    .catch(err => console.log(err));


// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home');
});

app.listen(5000, () => {
    console.log('app now listening for requests on port 3000');
});
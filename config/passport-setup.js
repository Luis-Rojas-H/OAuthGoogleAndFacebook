const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check is user already exists in our DB
        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    // allready have the user
                    console.log('user:id' + currentUser);
                    done(null, currentUser);
                }else{
                    // if not, create user in our DB
                    new User({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        age: 41,
                        email: profile.emails,
                        role: "9null9",
                        googleId: profile.id,
                        username: profile.displayName
                    }).save().then((newUser) => {
                        console.log('new user created: ', newUser);
                        done(null, newUser);
                    });
                }
            })
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);

passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        callbackURL: '/auth/facebook/redirect',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check is user already exists in our DB
        User.findOne({facebookId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    // allready have the user
                    console.log('user:id' + currentUser);
                    done(null, currentUser);
                }else{
                    // if not, create user in our DB
                    new User({
                        age: 41,
                        role: "9null9",
                        facebookId: profile.id,
                    }).save().then((newUser) => {
                        console.log('new user created: ', newUser);
                        done(null, newUser);
                    });
                }
            })
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "559058781489-82rpb0bap8btt4mli1vbuggngte4hte3.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if(err) { console.log('Error in passport-google-oauth: ', err); return; }

            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user) {
                // if found, set this user as req.user
                return done(null, user);
            }
            else {
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if(err) { console.log('Error in creating user after passport-google-oauth: ', err); return; }

                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;
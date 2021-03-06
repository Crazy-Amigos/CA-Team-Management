var passport = require('passport');
var mongoose = require('mongoose');
var users = mongoose.model('users');
// var LocalStratergy = require('passport-local');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('express-jwt');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    users.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));

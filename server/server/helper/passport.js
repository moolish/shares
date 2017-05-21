// const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const BaseProxy = require('../proxy/base');

module.exports = function (passport) {
    passport.use(new Strategy(
      function(username, password, cb) {
            BaseProxy.get('User', { username }, function(err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user.password !== password) { return cb(null, false); }
                return cb(null, user);
            });
      }));

    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        BaseProxy.get('User', id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
}

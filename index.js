/**
 * Module dependencies
 */

var scrypt = require('scrypt').verifyHash;

module.exports = function(options) {
  return function(app) {
    app.verifySecret(function(client, secret, done) {
      scrypt(client.secret, secret, function(err, result) {
        // scrypt returns an error+boolean if it's invalid;
        // consulate will treat an error as fatal and render
        // an error page so we need to check for the
        // 'password is incorrect' message and send only a boolean
        if (err && err.message === 'password is incorrect') return done(null, false);
        if (err && err.message === 'data is not a valid scrypt-encrypted block') return done('pass');
        done(err, result);
      });
    });
  };
};

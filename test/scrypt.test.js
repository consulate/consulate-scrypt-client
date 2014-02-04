/**
 * Module dependencies
 */
var should = require('should')
  , scrypt = require('..');

/**
 * Passwords
 */
var TESTING123_PASSWORD = 'c2NyeXB0AA8AAAAIAAAAAeIuKFmvIqeGcJHgq4XLCwVY9PyZ5W9aTNqh6l8ZMoA22fLuT5qchN6KI8ApKqB1bhFJjWvE4YyqI4R8g3B++Dwp5h4+Z6ApIBUF3wfY5G2+';

describe('consulate-scrypt', function() {

  var app;

  beforeEach(function() {
    app = {
      'verifySecret': function(fn) {
        app.callbacks.verifySecret = fn;
      },
      callbacks: {}
    };
  });

  it('should register a `verifySecret` callback', function() {
    var options = {}
      , instance = scrypt(options);

    instance(app);

    should.exist(app.callbacks.verifySecret);
    Object.keys(app.callbacks).should.have.length(1);
  });

  it('should not accept an incorrect password', function(done) {
    var instance = scrypt({})(app);

    app.callbacks.verifySecret({secret: TESTING123_PASSWORD}, "testing", function(err, isValid) {
      should.not.exist(err);
      should.exist(isValid);
      isValid.should.be.false;
      done();
    });
  });

  it('should return an error on an invalid password', function(done) {
    var instance = scrypt({})(app);

    app.callbacks.verifySecret({secret: 'invalid hash'}, "testing", function(err, isValid) {
      should.exist(err);
      done();
    });
  });

  it("should accept a correct password", function(done) {
    var instance = scrypt({})(app);

    app.callbacks.verifySecret({secret: TESTING123_PASSWORD}, "testing123", function(err, isValid) {
      should.not.exist(err);
      should.exist(isValid);
      isValid.should.be.true;
      done();
    });
  });
});

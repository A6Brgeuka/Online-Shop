var User = require('models/user').User;
var HttpError = require('error').HttpError;


module.exports = function(app){

  app.use('/', require('./front/frontpage'));

  app.use('/signin', require('./front/auth/signin'));

  app.use('/signup', require('./front/auth/signup'));

  app.use('/signout', require('./front/auth/signout'));
};


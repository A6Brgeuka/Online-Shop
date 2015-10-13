var User = require('models/user').User;
var HttpError = require('error').HttpError;
var chechAuth = require('middleware/checkAuth');


module.exports = function(app){

  app.use('/', require('./front/frontpage'));

  app.use('/signin', require('./front/auth/signin'));

  app.use('/signup', require('./front/auth/signup'));

  app.use('/signout', require('./front/auth/signout'));

  app.use('/productlist', require('./front/productlist'));

  app.use('/about', require('./front/about'));

  app.use('/contacts', require('./front/contacts'));

  app.use('/cart', require('./front/cart'));

  app.use('/chat', chechAuth, require('./front/chat'));

  app.use('/profile', chechAuth, require('./front/profile'));
};


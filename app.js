var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var HttpError = require('error').HttpError;
var log = require('libs/log');
var config = require('config');

var app = express();



// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var sessionStore = require('libs/sessionStore');

app.use(session({
  secret: config.get('session:secret'),  //��� ���� ����� ����������� ����
  key: config.get('session:key'), //����
  cookie: config.get('session:cookie'), //
  store: sessionStore
}));

/*app.use(function (req, res, next) {
  //console.log(req.session);
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  res.send("Visits:" + req.session.numberOfVisits)
});*/

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));
app.use(require('middleware/loadCategory'));

require('routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace

app.use(function (err, req, res, next) {
  //log.info(err.message);
  if(typeof  err == 'number'){
    err = new HttpError(err);
  }

  if(err instanceof  HttpError){
    res.sendHttpError(err);
  } else {
    if(process.env.NODE_ENV == 'development'){
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }

});


/*if (process.env.NODE_ENV === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});*/


module.exports = app;

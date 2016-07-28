var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var everyauth = require('./lib/everyauth/index');
require('./lib/auth/auth-settings')

var loginFilter = require('./lib/filter/loginFilter').loginFilter;

var MongoStore = require('connect-mongo')(session);
var config = require('./config/config')

var archives = require('./routes/archive');
var routes = require('./routes/index');
var users = require('./routes/userController');
var profiles = require('./routes/profileController');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//config cookie
app.use(cookieParser('hunter cookie'));

//config everyauth
app.use(everyauth.middleware());

//config session
app.use(session({
  store: new MongoStore({
    host: config.session.host,
    port: config.session.port,
    db: config.session.db,
    url: config.session.url,
    ttl: config.session.ttl //30 days
  }),
  cookie: { maxAge: config.cookie.maxAge },
  resave:false,
  saveUninitialized:false,
  secret: 'hunter security'
}))

//login filter
app.use(loginFilter);

app.use('/', routes);
app.use('/users', users);
app.use('/archives', archives);
app.use('/profiles', profiles);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
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
});


module.exports = app;

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const debug = require('debug')('gupiao:server');
const http = require('http');
const config = require('config');
const passport = require('passport');

const models = require('./models');
const Router = require('./router');

const app = express();

// view engine setup
app.set('views', path.join( __dirname, '/..', 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'shares cat', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./helper/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

Router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const server = http.createServer(app);

models.sequelize.sync().then(function () {
    console.log('database sync succeed!');
    app.listen(config.port, function () {
        console.log(`valuations server ready on port ${config.port}`);
        console.log(`listening ${config.port}`);
    });
    // 插入测试数据
    require('./helper/seed-db')();
}).catch(function (e) {
    throw new Error(e);
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');

var app = express();

// mongoose
mongoose.connect('mongodb+srv://WebtechProject:kweeni123@clustermongo-jm8tv.mongodb.net/', {dbName: "kweeni"});
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
  console.log('Successfully connected');
  // show collections of database
  connection.db.listCollections().toArray(function(err, names){
    console.log(names)
  })
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// setup express app
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// initialize Passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

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
var Strategy = require('passport-facebook').Strategy;
var Users = require('./models/User');

var app = express();
/*
// configure the Facebook strategy for use by Passport
passport.use(new Strategy({
  clientID: '226457874572897',
  clientSecret: 'bec4b902be325e182532a48530533072',
  callbackURL: 'https://8992a753.ngrok.io/login/facebook/return',
  //callbackURL: 'https://kweeni-app-imd.herokuapp.com/login/facebook/return',
  profileFields: ['id','displayName', 'photos'],
}, 
// function must invoke `cb` with a user object, which will be set at `req.user` in route handlers
function(accessToken, refreshToken, profile, cb) {
 
    Users.findOne({'id': profile.id}, function(err, user) {
      if (err) 
        return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        var user = new Users();
        user.id = profile.id;
        user.name = profile.displayName;
        user.avatar = profile.photos[0].value;
        user.save(function(err) {
          if (err)
            throw err;
          return cb(null, profile)
        })
      }
    })
}));
*/
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
/*
// configure Passport authenticated session persistence
// serialize users into and deserialize out of the session to restore authentication state across HTTP requests

// supply the user ID when serializing
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

// querying the user record by ID when deserializing
passport.deserializeUser(function(id, cb) {
  Users.findOne({'id': profile.id}, function(err, user) {
    cb(err, user);
  });
});*/

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

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Strategy = require('passport-facebook').Strategy;
var Users = require('../models/User');

// configure the Facebook strategy for use by Passport
passport.use(new Strategy({
  clientID: '226457874572897',
  clientSecret: 'bec4b902be325e182532a48530533072',
  //callbackURL: 'https://8992a753.ngrok.io/login/facebook/return',
  callbackURL: 'https://kweeni-app-imd.herokuapp.com/login/facebook/return',
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
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

// redirect user to facebook for authentication
router.get('/login/facebook',
  passport.authenticate('facebook'));

// facebook will redirect the user to this URL after approval
router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // redirect user to /kweeni route
    res.redirect('/kweeni');
  })

/* route to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.user) return next();
  res.redirect('/');
}*/

/* GET kweeni page. */
router.get('/kweeni', function(req, res, next) {
  //console.log(req.profile);
  //console.log(req.user);
  res.render('kweeni', { 
    title: 'Kweeni',
    user: req.user
  });
});

/* GET details page. */
router.get('/kweeni/:id', function(req, res, next) {
  console.log('id:', req.params.id);
});

// route for logging out
router.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



module.exports = router;

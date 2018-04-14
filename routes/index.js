var express = require('express');
var passport = require('passport');
var router = express.Router();

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

/* GET kweeni page. */
router.get('/kweeni', isLoggedIn, function(req, res, next) {
  res.render('kweeni', { 
    title: 'Kweeni',
    user: req.user.id,
    username: req.user.name,
    avatar: req.user.avatar
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

// route to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

module.exports = router;

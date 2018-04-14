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
router.get('/kweeni', function(req, res, next) {
  res.render('kweeni', { 
    title: 'Kweeni',
    user: req.user 
  });
});

/* GET details page. */
router.get('/kweeni/:id', function(req, res, next) {
  console.log('Request Id:', req.params.id);
});

// route for logging out
router.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

var express = require('express');
var passport = require('passport');
var router = express.Router();
var Strategy = require('passport-facebook').Strategy;
var Topic = require('../models/Topic');
var User = require('../models/User');

// configure the Facebook strategy for use by Passport
passport.use(new Strategy({
  clientID: '226457874572897',
  clientSecret: 'bec4b902be325e182532a48530533072',
  callbackURL: 'https://6b6205af.ngrok.io/login/facebook/return',
  //callbackURL: 'https://kweeni-app-imd.herokuapp.com/login/facebook/return',
  profileFields: ['id','displayName', 'photos'],
}, 
// function must invoke `cb` with a user object, which will be set at `req.user` in route handlers
function(accessToken, refreshToken, profile, cb) {
    User.findOne({"id": profile.id}, function(err, user) {
      if (err) 
        return cb(err);
      if (user) {
        return cb(null, user);
      } else {
        var newUser = new User();
        newUser.id = profile.id;
        newUser.name = profile.displayName;
        newUser.avatar = profile.photos[0].value;
        newUser.save(function(err) {
          if (err)
            throw err;
          return cb(null, newUser)
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
  User.findOne({"id": id}, function(err, user) {
    cb(err, user);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

// redirect user to facebook for authentication
router.get('/login/facebook',
  passport.authenticate('facebook', { failureRedirect: '/'}) 
);

// facebook will redirect the user to this URL after approval
router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // redirect user to /kweeni route
    var user = req.user;
    res.redirect('/kweeni');
});

// route to make sure a user is logged in
function isLoggedIn(req, res, next) {
  if (req.user) return next();
  res.redirect('/');
}

// GET request for list of all topics
router.get('/kweeni', isLoggedIn, function(req, res, next) {
  Topic.find({}, 'title author')
  .populate('author')
  .exec(function (err, topics) {
  if (err) { return next(err); }
  //Successful, so render
  console.log(topics);
  res.render('kweeni', {
      title: 'Kweeni',
      userId: req.user.id,
      username: req.user.name,
      avatar: req.user.avatar,
      topic_list: topics 
    });
  });
})

// POST request for creating a topic
router.post('/kweeni', function(req, res, next) {    
  var topic = new Topic({
    title: req.body.hero__form__input,
    date: Date.now(),
    author: user._id
  });
  topic.save(function(err){
      if (err) { return next(err); }
      var url = id;
      res.redirect(topic.url);
  })
})

// GET request for one topic
router.get('kweeni/:id', function(req, res, next) {
  var topicId = req.params.id;
  Topic.findById()
        .populate('author')
        .exec(function(err, topic) {
            if (err) { return next(err); }
            if (topic == null) {
                var err = new Error('Topic not found');
                err.status = 404;
                return next(err);
            }
            res.render('kweeni_id', {
                topic: topic
            })
        });
})

/*
router.get('/kweeni', topicsController.fetchAll);
router.post('/kweeni', topicsController.create);
router.get('/kweeni/:id', topicsController.fetchOne);
router.put('/kweeni/:id', topicsController.update);
*/

// route for logging out
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

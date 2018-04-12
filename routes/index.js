var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

/* GET kweeni page. */
router.get('/kweeni', function(req, res, next) {
  res.render('kweeni', { title: 'Kweeni' });
});

/* GET details page. */
router.get('/kweeni/:id', function(req, res, next) {
  console.log('Request Id:', req.params.id);
});

module.exports = router;

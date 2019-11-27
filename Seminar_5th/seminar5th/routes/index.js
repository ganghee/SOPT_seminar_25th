var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));
console.log('index.js');

module.exports = router;

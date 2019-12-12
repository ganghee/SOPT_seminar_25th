var express = require('express');
var router = express.Router();

router.use('/blog', require('./blogs'));
router.use('/auth', require('./auth'));
router.use('/',require('./allContents'));

console.log('index.js');

module.exports = router;

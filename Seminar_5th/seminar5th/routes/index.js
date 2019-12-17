var express = require('express');
var router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/auth', require('./auth'));
router.use('/',require('./allContents'));

console.log('index.js');

module.exports = router;

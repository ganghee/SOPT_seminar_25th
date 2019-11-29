var express = require('express');
var router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/',require('./allContents'));

router.use('/multerTest', require('./multerTest'));
router.use('/jwtTest', require('./jwtTest'));
console.log('index.js');

module.exports = router;

var express = require('express');
var router = express.Router();

console.log('trace: /api/auth/index.js');
router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));

module.exports = router;
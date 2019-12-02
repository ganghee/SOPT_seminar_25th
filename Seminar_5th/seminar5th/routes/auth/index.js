const express = require('express'); 
const router = express.Router({mergeParams: true});

router.use('/', require('./auth'));

console.log('/auth');

module.exports = router;
